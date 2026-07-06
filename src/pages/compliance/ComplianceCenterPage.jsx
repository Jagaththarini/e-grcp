import React, { useEffect, useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, CircularProgress, Alert, 
  Tabs, Tab, Paper, Divider, Stack, List, ListItem, Avatar
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComplianceData } from '../../store/slices/complianceSlice';
import SectionHeader from '../../components/common/SectionHeader';
import StatusChip from '../../components/common/StatusChip';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import CancelIcon from '@mui/icons-material/Cancel';

function ComplianceCenterPage() {
  const dispatch = useDispatch();
  const { violations, missingDocuments, expiredCertifications, complianceScore, loading } = useSelector(state => state.compliance);
  
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => { 
    dispatch(fetchComplianceData()); 
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  if (loading && violations.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <SectionHeader title="Compliance Overview" subtitle="Track and resolve vendor compliance risks across your supply chain" />

      {/* Unified KPI Banner instead of individual Grid cards */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} divider={<Divider orientation="vertical" flexItem />} spacing={4} justifyContent="space-around">
          
          <Box textAlign="center">
            <Typography color="text.secondary" variant="subtitle2" gutterBottom>Compliance Score</Typography>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <VerifiedUserIcon color={complianceScore >= 80 ? 'success' : 'warning'} />
              <Typography variant="h4" fontWeight="bold" color={complianceScore >= 80 ? 'success.main' : 'warning.main'}>
                {complianceScore}%
              </Typography>
            </Stack>
          </Box>

          <Box textAlign="center">
            <Typography color="text.secondary" variant="subtitle2" gutterBottom>Active Violations</Typography>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <ErrorOutlineIcon color={violations.length > 0 ? 'error' : 'success'} />
              <Typography variant="h4" fontWeight="bold">{violations.length}</Typography>
            </Stack>
          </Box>

          <Box textAlign="center">
            <Typography color="text.secondary" variant="subtitle2" gutterBottom>Missing Documents</Typography>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <FindInPageIcon color={missingDocuments.length > 0 ? 'warning' : 'action'} />
              <Typography variant="h4" fontWeight="bold">{missingDocuments.length}</Typography>
            </Stack>
          </Box>

          <Box textAlign="center">
            <Typography color="text.secondary" variant="subtitle2" gutterBottom>Expired Certs</Typography>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <CancelIcon color={expiredCertifications.length > 0 ? 'error' : 'action'} />
              <Typography variant="h4" fontWeight="bold">{expiredCertifications.length}</Typography>
            </Stack>
          </Box>

        </Stack>
      </Paper>

      {violations.length > 0 && (
        <Alert severity="error" icon={<ErrorOutlineIcon fontSize="inherit" />} sx={{ mb: 4, borderRadius: 2 }}>
          <strong>Action Required:</strong> You have {violations.length} compliance violation{violations.length > 1 ? 's' : ''} currently active.
        </Alert>
      )}

      {/* Tabbed Interface for Data Views */}
      <Card elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
          <Tabs value={currentTab} onChange={handleTabChange} variant="fullWidth">
            <Tab label={`Violations (${violations.length})`} />
            <Tab label={`Certifications (${expiredCertifications.length})`} />
            <Tab label={`Missing Documents (${missingDocuments.length})`} />
          </Tabs>
        </Box>

        <CardContent sx={{ p: 0 }}>
          
          {/* TAB 1: Violations (Redesigned as a List rather than a Table) */}
          {currentTab === 0 && (
            <Box p={2}>
              {violations.length === 0 ? (
                <Typography textAlign="center" color="text.secondary" py={4}>No active violations found. Great job!</Typography>
              ) : (
                <List sx={{ width: '100%' }}>
                  {violations.map((v, index) => (
                    <React.Fragment key={v.id}>
                      <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                        <Avatar sx={{ bgcolor: 'error.light', mr: 2 }}><ErrorOutlineIcon /></Avatar>
                        <Box flex={1}>
                          <Stack direction="row" justifyContent="space-between" mb={0.5}>
                            <Typography variant="subtitle1" fontWeight={600}>{v.vendorName}</Typography>
                            <StatusChip status={v.severity} />
                          </Stack>
                          <Typography variant="body2" color="text.secondary" mb={1}>{v.issue}</Typography>
                          <Typography variant="caption" fontWeight="bold" color="error.main">Impact Score: {v.score}%</Typography>
                        </Box>
                      </ListItem>
                      {index < violations.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Box>
          )}

          {/* TAB 2: Expired Certifications (Clean Table View) */}
          {currentTab === 1 && (
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: 'background.default' }}>
                  <TableRow>
                    <TableCell>Vendor Name</TableCell>
                    <TableCell>Certificate Type</TableCell>
                    <TableCell>Expiration Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expiredCertifications.length === 0 ? (
                    <TableRow><TableCell colSpan={4} align="center" sx={{ py: 4 }}><Typography color="text.secondary">All certifications are up to date.</Typography></TableCell></TableRow>
                  ) : expiredCertifications.map(cert => (
                    <TableRow key={cert.id} hover>
                      <TableCell><Typography fontWeight={500}>{cert.vendorName}</Typography></TableCell>
                      <TableCell color="text.secondary">{cert.certName}</TableCell>
                      <TableCell>{cert.expiry || 'N/A'}</TableCell>
                      <TableCell align="right"><StatusChip status={cert.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* TAB 3: Missing Documents */}
          {currentTab === 2 && (
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: 'background.default' }}>
                  <TableRow>
                    <TableCell>Vendor Name</TableCell>
                    <TableCell>Required Document</TableCell>
                    <TableCell align="right">Severity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {missingDocuments.length === 0 ? (
                    <TableRow><TableCell colSpan={3} align="center" sx={{ py: 4 }}><Typography color="text.secondary">No missing documents.</Typography></TableCell></TableRow>
                  ) : missingDocuments.map(doc => (
                    <TableRow key={doc.id} hover>
                      <TableCell><Typography fontWeight={500}>{doc.vendorName}</Typography></TableCell>
                      <TableCell color="text.secondary">{doc.documentName}</TableCell>
                      <TableCell align="right"><StatusChip status={doc.severity} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

        </CardContent>
      </Card>
    </Box>
  );
}

export default ComplianceCenterPage;