import requestsData from '../mocks/requests.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const STORAGE_KEY = 'egrcp_procurement_requests'

// Load requests from localStorage or initialize from JSON
const loadRequests = () => {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (stored) {
    return JSON.parse(stored)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(requestsData))
  return [...requestsData]
}

// Save requests
const saveRequests = (requests) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
}

// Fetch Requests
export const fetchRequests = async (params = {}) => {
  await delay(500)

  let requests = loadRequests()

  let filtered = [...requests]

  if (params.status) {
    filtered = filtered.filter(r => r.status === params.status)
  }

  if (params.search) {
    const search = params.search.toLowerCase()

    filtered = filtered.filter(r =>
      r.id.toLowerCase().includes(search) ||
      r.title.toLowerCase().includes(search) ||
      (r.vendor || '').toLowerCase().includes(search) ||
      (r.department || '').toLowerCase().includes(search)
    )
  }

  if (params.department) {
    filtered = filtered.filter(
      r => r.department === params.department
    )
  }

  if (params.priority) {
    filtered = filtered.filter(
      r => r.priority === params.priority
    )
  }

  return {
    requests: filtered,
    total: filtered.length
  }
}

// Fetch Request by ID
export const fetchRequestById = async (id) => {
  await delay(400)

  const requests = loadRequests()

  const request = requests.find(r => r.id === id)

  if (!request) {
    throw new Error('Request not found')
  }

  return request
}

// Create Request
export const createRequest = async (data) => {
  await delay(600)

  const requests = loadRequests()

  const nextNumber = requests.length + 1

  const newRequest = {
    id: `REQ-${String(nextNumber).padStart(4, '0')}`,

    ...data,

    status: 'pending',

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),

    approvalHistory: [],

    comments: [],

    auditLogs: [
      {
        id: `log-${Date.now()}`,
        action: 'Request Created',
        user: data.requestedBy,
        timestamp: new Date().toISOString()
      }
    ]
  }

  requests.unshift(newRequest)

  saveRequests(requests)

  return newRequest
}

// Update Request
export const updateRequest = async (id, data) => {
  await delay(500)

  const requests = loadRequests()

  const index = requests.findIndex(r => r.id === id)

  if (index === -1) {
    throw new Error('Request not found')
  }

  requests[index] = {
    ...requests[index],
    ...data,
    updatedAt: new Date().toISOString()
  }

  saveRequests(requests)

  return requests[index]
}

// Approve Request
export const approveRequest = async ({ id, comment }) => {
  await delay(500)

  const requests = loadRequests()

  const index = requests.findIndex(r => r.id === id)

  if (index === -1) {
    throw new Error('Request not found')
  }

  const approval = {
    id: `ap-${Date.now()}`,
    action: 'Approved',
    user: 'Bob Smith',
    role: 'Procurement Manager',
    comment,
    timestamp: new Date().toISOString()
  }

  requests[index] = {
    ...requests[index],
    status: 'approved',
    updatedAt: new Date().toISOString(),
    approvalHistory: [
      ...(requests[index].approvalHistory || []),
      approval
    ]
  }

  saveRequests(requests)

  return requests[index]
}

// Reject Request
export const rejectRequest = async ({ id, comment }) => {
  await delay(500)

  const requests = loadRequests()

  const index = requests.findIndex(r => r.id === id)

  if (index === -1) {
    throw new Error('Request not found')
  }

  const rejection = {
    id: `rej-${Date.now()}`,
    action: 'Rejected',
    user: 'Bob Smith',
    role: 'Procurement Manager',
    comment,
    timestamp: new Date().toISOString()
  }

  requests[index] = {
    ...requests[index],
    status: 'rejected',
    updatedAt: new Date().toISOString(),
    approvalHistory: [
      ...(requests[index].approvalHistory || []),
      rejection
    ]
  }

  saveRequests(requests)

  return requests[index]
}

// Delete Request (Optional)
export const deleteRequest = async (id) => {
  await delay(300)

  const requests = loadRequests()

  const updated = requests.filter(r => r.id !== id)

  saveRequests(updated)

  return true
}

// Reset Local Storage (Development Only)
export const resetRequests = () => {
  localStorage.removeItem(STORAGE_KEY)
}