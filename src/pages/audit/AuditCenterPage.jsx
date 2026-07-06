import React, { useEffect, useState, useMemo } from 'react'
import { 
  Box, Card, CardContent, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Tabs, Tab, Chip, CircularProgress, 
  TextField, InputAdornment, Alert 
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuditLogs } from '../../store/slices/auditSlice'
import SectionHeader from '../../components/common/SectionHeader'
import KpiCard from '../../components/common/KpiCard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PersonIcon from '@mui/icons-material/Person'
import ComputerIcon from '@mui/icons-material/Computer'
import SearchIcon from '@mui/icons-material/Search'

const levelColors = { info: 'info', warning: 'warning', error: 'error' }

function TabPanel({ value, index, children }) {
  return value === index ? <Box pt={2}>{children}</Box> : null
}

function AuditCenterPage() {
  const dispatch = useDispatch()
  // Added safe defaults and extracted 'error' state
  const { logs = [], userActivities = [], systemLogs = [], loading, error } = useSelector(state => state.audit)
  const [tab, setTab] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => { 
    dispatch(fetchAuditLogs()) 
  }, [dispatch])

  // Search filtering logic
  const filteredLogs = useMemo(() => 
    logs.filter(log => log.action?.toLowerCase().includes(searchTerm.toLowerCase()) || log.user?.toLowerCase().includes(searchTerm.toLowerCase())),
  [logs, searchTerm])

  const filteredUserActivities = useMemo(() => 
    userActivities.filter(a => a.user?.toLowerCase().includes(searchTerm.toLowerCase()) || a.action?.toLowerCase().includes(searchTerm.toLowerCase())),
  [userActivities, searchTerm])

  const filteredSystemLogs = useMemo(() => 
    systemLogs.filter(log => log.event?.toLowerCase().includes(searchTerm.toLowerCase()) || log.level?.toLowerCase().includes(searchTerm.toLowerCase())),
  [systemLogs, searchTerm])

  if (loading && logs.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <SectionHeader title="Audit Center" subtitle="Complete audit trail, user activities and system logs" />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Failed to load audit data. Please try again.'}
        </Alert>
      )}

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <Box flex={1} minWidth={180}>
          <KpiCard title="Audit Events" value={logs.length} icon={<AssignmentIcon sx={{ fontSize: 20 }} />} color="primary.main" />
        </Box>
        <Box flex={1} minWidth={180}>
          <KpiCard title="User Activities" value={userActivities.length} icon={<PersonIcon sx={{ fontSize: 20 }} />} color="secondary.main" />
        </Box>
        <Box flex={1} minWidth={180}>
          <KpiCard title="System Logs" value={systemLogs.length} icon={<ComputerIcon sx={{ fontSize: 20 }} />} color="warning.main" />
        </Box>
      </Box>

      <Card>
        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} borderBottom="1px solid" borderColor="divider">
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label={`Audit History (${filteredLogs.length})`} />
            <Tab label={`User Activities (${filteredUserActivities.length})`} />
            <Tab label={`System Logs (${filteredSystemLogs.length})`} />
          </Tabs>
          
          <TextField
            size="small"
            placeholder="Search logs..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
        </Box>

        <CardContent>
          <TabPanel value={tab} index={0}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLogs.length > 0 ? filteredLogs.map(log => (
                    <TableRow key={log.id} hover>
                      <TableCell><Typography variant="body2" fontWeight={500}>{log.action}</Typography></TableCell>
                      <TableCell><Typography variant="body2" color="text.secondary">{log.user}</Typography></TableCell>
                      <TableCell><Typography variant="caption" color="text.secondary">{new Date(log.timestamp).toLocaleString()}</Typography></TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={3} align="center">No records found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>IP Address</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUserActivities.length > 0 ? filteredUserActivities.map(a => (
                    <TableRow key={a.id} hover>
                      <TableCell><Typography variant="body2" fontWeight={500}>{a.user}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{a.action}</Typography></TableCell>
                      <TableCell><Typography variant="caption" fontFamily="monospace">{a.ip}</Typography></TableCell>
                      <TableCell><Typography variant="caption" color="text.secondary">{new Date(a.timestamp).toLocaleString()}</Typography></TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={4} align="center">No records found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={tab} index={2}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSystemLogs.length > 0 ? filteredSystemLogs.map(log => (
                    <TableRow key={log.id} hover>
                      <TableCell><Typography variant="body2">{log.event}</Typography></TableCell>
                      <TableCell><Chip label={log.level} size="small" color={levelColors[log.level] || 'default'} sx={{ fontWeight: 500, fontSize: '0.72rem' }} /></TableCell>
                      <TableCell><Typography variant="caption" color="text.secondary">{new Date(log.timestamp).toLocaleString()}</Typography></TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={3} align="center">No records found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AuditCenterPage