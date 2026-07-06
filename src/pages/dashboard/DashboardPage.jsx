import React, { useEffect, useMemo } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Chip,
  alpha
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { fetchDashboardData } from '../../store/slices/dashboardSlice';
import KpiCard from '../../components/common/KpiCard';
import SectionHeader from '../../components/common/SectionHeader';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SecurityIcon from '@mui/icons-material/Security';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const COLORS = ['#0057B8', '#00A0DC', '#2E7D32', '#ED6C02', '#D32F2F', '#7B1FA2'];

// Extracted color map for better maintainability
const ACTIVITY_COLORS = { 
  procurement: 'primary.main', 
  risk: 'error.main', 
  approval: 'success.main', 
  vendor: 'warning.main' 
};

function ActivityItem({ item }) {
  return (
    <Box display="flex" gap={2} py={1.5} borderBottom="1px solid" borderColor="divider" sx={{ '&:last-child': { borderBottom: 0 } }}>
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: ACTIVITY_COLORS[item.type] || 'grey.400', mt: 0.75, flexShrink: 0 }} />
      <Box flex={1}>
        <Typography variant="body2" fontWeight={600} color="text.primary">{item.action}</Typography>
        <Typography variant="caption" color="text.secondary">
          {item.user} • {new Date(item.time).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Box>
    </Box>
  );
}

function DashboardPage() {
  const dispatch = useDispatch();
  // Added default empty arrays to prevent mapping errors before data loads
  const { 
    kpis, 
    procurementTrend = [], 
    departmentSpend = [], 
    activityTimeline = [], 
    loading 
  } = useSelector(state => state.dashboard);

  useEffect(() => { 
    dispatch(fetchDashboardData()); 
  }, [dispatch]);

  const kpiCards = useMemo(() => kpis ? [
    { title: 'Total Spend', value: `$${kpis.totalSpend || '0'}`, icon: <AttachMoneyIcon sx={{ fontSize: 22 }} />, color: 'info.main', subtitle: 'Year to date' },
    { title: 'Total Requests', value: kpis.totalRequests, icon: <ShoppingCartIcon sx={{ fontSize: 22 }} />, color: 'primary.main' },
    { title: 'Pending Approval', value: kpis.pendingRequests, icon: <HourglassEmptyIcon sx={{ fontSize: 22 }} />, color: 'warning.main', subtitle: `${kpis.escalatedRequests || 0} escalated` },
    { title: 'Approved', value: kpis.approvedRequests, icon: <CheckCircleIcon sx={{ fontSize: 22 }} />, color: 'success.main' },
    { title: 'Rejected', value: kpis.rejectedRequests, icon: <CancelIcon sx={{ fontSize: 22 }} />, color: 'error.main' },
    { title: 'Total Vendors', value: kpis.totalVendors, icon: <StorefrontIcon sx={{ fontSize: 22 }} />, color: 'secondary.main', subtitle: `${kpis.activeVendors || 0} active` },
    { title: 'Open Risks', value: kpis.openRisks, icon: <SecurityIcon sx={{ fontSize: 22 }} />, color: 'error.main', subtitle: `${kpis.highRisks || 0} high severity` },
    { title: 'Compliance Issues', value: kpis.complianceIssues, icon: <WarningAmberIcon sx={{ fontSize: 22 }} />, color: 'warning.main' },
  ] : [], [kpis]);

  if (loading && !kpis) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <CircularProgress size={48} thickness={4} />
      </Box>
    );
  }

  // Reusable card styles for hover effects
  const cardStyle = { 
    height: '100%', 
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
  };

  return (
    <Box sx={{ pb: 4 }}>
      <SectionHeader title="Executive Dashboard" subtitle="Real-time business overview and key performance indicators" />

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        {kpiCards.map((card, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <KpiCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mb={4}>
        {/* Procurement Trend */}
        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={3}>Monthly Procurement Trend</Typography>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={procurementTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ED6C02" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ED6C02" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D32F2F" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#D32F2F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={alpha('#000', 0.1)} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: 10 }} />
                  <Area type="monotone" dataKey="approved" stroke="#2E7D32" fill="url(#colorApproved)" strokeWidth={3} name="Approved" />
                  <Area type="monotone" dataKey="pending" stroke="#ED6C02" fill="url(#colorPending)" strokeWidth={3} name="Pending" />
                  <Area type="monotone" dataKey="rejected" stroke="#D32F2F" fill="url(#colorRejected)" strokeWidth={3} name="Rejected" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Department Spend */}
        <Grid item xs={12} md={6} lg={4}>
  <Card sx={cardStyle}>
    <CardContent>
      <Typography variant="h6" fontWeight={600} mb={3}>
        Department Spending
      </Typography>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={departmentSpend}
            dataKey="spend"
            nameKey="department"
            cx="50%"
            cy="45%"
            innerRadius="45%"
            outerRadius="70%"
            paddingAngle={3}
            label={({ percent }) =>
              `${(percent * 100).toFixed(0)}%`
            }
          >
            {departmentSpend.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [
              `$${Number(value).toLocaleString()}`,
              "Spend",
            ]}
            contentStyle={{
              borderRadius: 10,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,.15)",
            }}
          />

          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{
              paddingTop: 20,
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
</Grid>

        
      </Grid>
    </Box>
  );
}

export default DashboardPage;