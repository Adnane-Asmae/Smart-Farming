import { useState } from 'react';
import { Card, Typography, Button, Input, Select, Tag, Space, Row, Col } from 'antd';
import { SearchOutlined, FilterOutlined, PlusOutlined, EyeOutlined, EditOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import useAuthStore from '../stores/useAuthStore';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const Interventions = () => {
  const { user } = useAuthStore();
  const userRole = user?.role || 'FARMER';

  const [interventions, setInterventions] = useState([
    { 
      id: 'INT-2024-145', 
      type: 'Pest Control Application', 
      parcelle: 'Parcel A-12', 
      culture: 'Tomatoes',
      status: 'In Progress', 
      priority: 'High', 
      date: '2024-05-15',
      description: 'Apply organic pesticide to control aphid infestation',
      notes: 'Weather conditions favorable for application'
    },
    { 
      id: 'INT-2024-143', 
      type: 'Fertilization', 
      parcelle: 'Parcel B-5', 
      culture: 'Wheat',
      status: 'To Do', 
      priority: 'Medium', 
      date: '2024-05-16',
      description: 'Apply nitrogen-based fertilizer',
      notes: ''
    },
    { 
      id: 'INT-2024-141', 
      type: 'Soil Testing', 
      parcelle: 'Parcel C-8', 
      culture: 'Corn',
      status: 'To Do', 
      priority: 'Low', 
      date: '2024-05-18',
      description: 'Collect soil samples for pH and nutrient analysis',
      notes: ''
    },
    { 
      id: 'INT-2024-139', 
      type: 'Harvesting', 
      parcelle: 'Parcel D-3', 
      culture: 'Lettuce',
      status: 'Completed', 
      priority: 'High', 
      date: '2024-05-13',
      description: 'Harvest mature lettuce heads',
      notes: 'Completed ahead of schedule. Good yield.'
    },
  ]);

  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  const getStatusTag = (status) => {
    const colors = {
      'In Progress': '#dbeafe',
      'To Do': '#f3f4f6',
      'Completed': '#d1fae5'
    };
    const textColors = {
      'In Progress': '#2563eb',
      'To Do': '#6b7280',
      'Completed': '#059669'
    };
    return (
      <Tag color={colors[status]} style={{ border: 'none' }}>
        <span style={{ color: textColors[status], fontWeight: 500 }}>{status}</span>
      </Tag>
    );
  };

  const getPriorityTag = (priority) => {
    const colors = {
      'High': '#fee2e2',
      'Medium': '#fff7ed',
      'Low': '#d1fae5'
    };
    const textColors = {
      'High': '#dc2626',
      'Medium': '#ea580c',
      'Low': '#059669'
    };
    return (
      <Tag color={colors[priority]} style={{ border: 'none' }}>
        <span style={{ color: textColors[priority], fontWeight: 500 }}>{priority}</span>
      </Tag>
    );
  };

  const filteredInterventions = interventions.filter(item => {
    const matchesSearch = item.type.toLowerCase().includes(searchText.toLowerCase()) || 
                          item.parcelle.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const renderTechnicianInterventions = () => (
    <>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>
            My Interventions
          </Title>
          <Paragraph type="secondary" style={{ margin: '8px 0 0', fontSize: 15 }}>
            Manage and track your assigned field interventions
          </Paragraph>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          size="large"
          style={{ 
            background: '#23a045',
            border: 'none',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            height: 44
          }}
        >
          Add Observation
        </Button>
      </div>

      <Card 
        style={{ 
          borderRadius: 16, 
          border: '1px solid #e2e8e0',
          boxShadow: 'none',
          marginBottom: 24
        }}
        styles={{ body: { padding: 24 } }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <Input 
              placeholder="Search interventions..." 
              prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ borderRadius: 10, background: '#f3f4f6', border: 'none' }}
            />
          </Col>
          <Col xs={24} md={6}>
            <Select 
              defaultValue="All" 
              size="large"
              style={{ width: '100%', borderRadius: 10 }}
              value={statusFilter}
              onChange={setStatusFilter}
              prefix={<FilterOutlined />}
            >
              <Option value="All">All Status</Option>
              <Option value="To Do">To Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Select 
              defaultValue="All" 
              size="large"
              style={{ width: '100%', borderRadius: 10 }}
              value={priorityFilter}
              onChange={setPriorityFilter}
            >
              <Option value="All">All Priorities</Option>
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space size="middle">
          <Tag 
            color={statusFilter === 'All' ? '#e5e7eb' : '#f3f4f6'} 
            style={{ 
              fontSize: 14, 
              fontWeight: 500, 
              border: 'none',
              padding: '8px 16px',
              borderRadius: 20,
              cursor: 'pointer'
            }}
            onClick={() => setStatusFilter('All')}
          >
            All ({interventions.length})
          </Tag>
          <Tag 
            color={statusFilter === 'To Do' ? '#e5e7eb' : '#f3f4f6'} 
            style={{ 
              fontSize: 14, 
              fontWeight: 500, 
              border: 'none',
              padding: '8px 16px',
              borderRadius: 20,
              cursor: 'pointer'
            }}
            onClick={() => setStatusFilter('To Do')}
          >
            To Do ({interventions.filter(i => i.status === 'To Do').length})
          </Tag>
          <Tag 
            color={statusFilter === 'In Progress' ? '#e5e7eb' : '#f3f4f6'} 
            style={{ 
              fontSize: 14, 
              fontWeight: 500, 
              border: 'none',
              padding: '8px 16px',
              borderRadius: 20,
              cursor: 'pointer'
            }}
            onClick={() => setStatusFilter('In Progress')}
          >
            In Progress ({interventions.filter(i => i.status === 'In Progress').length})
          </Tag>
          <Tag 
            color={statusFilter === 'Completed' ? '#e5e7eb' : '#f3f4f6'} 
            style={{ 
              fontSize: 14, 
              fontWeight: 500, 
              border: 'none',
              padding: '8px 16px',
              borderRadius: 20,
              cursor: 'pointer'
            }}
            onClick={() => setStatusFilter('Completed')}
          >
            Completed ({interventions.filter(i => i.status === 'Completed').length})
          </Tag>
        </Space>

        {filteredInterventions.map((intervention) => (
          <Card 
            key={intervention.id}
            style={{ 
              borderRadius: 16, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <Title level={4} style={{ margin: 0, color: '#1a1a1a', fontSize: 20 }}>
                    {intervention.type}
                  </Title>
                  {getStatusTag(intervention.status)}
                  {getPriorityTag(intervention.priority)}
                </div>
                <Text style={{ fontSize: 15, color: '#667085', display: 'block', marginBottom: 8 }}>
                  ID: {intervention.id}
                </Text>
                <Text style={{ fontSize: 15, color: '#667085', display: 'block', marginBottom: 16 }}>
                  {intervention.description}
                </Text>
                <Space size="large" style={{ marginBottom: intervention.notes ? 16 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <EnvironmentOutlined style={{ color: '#4a7c59' }} />
                    <Text style={{ fontSize: 14, color: '#667085' }}>
                      {intervention.parcelle} • {intervention.culture}
                    </Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CalendarOutlined style={{ color: '#667085' }} />
                    <Text style={{ fontSize: 14, color: '#667085' }}>
                      Due: {intervention.date}
                    </Text>
                  </div>
                </Space>
                {intervention.notes && (
                  <div style={{ 
                    background: '#f0fdf4', 
                    padding: 16, 
                    borderRadius: 12,
                    marginTop: 8
                  }}>
                    <Text style={{ fontSize: 14, color: '#166534', fontWeight: 500 }}>
                      Notes: {intervention.notes}
                    </Text>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
                <Button 
                  size="large"
                  icon={<EyeOutlined />}
                  style={{ 
                    border: '1px solid #e2e8e0', 
                    borderRadius: 10,
                    fontWeight: 500
                  }}
                >
                  View Details
                </Button>
                <Button 
                  type="primary" 
                  size="large"
                  icon={<EditOutlined />}
                  style={{ 
                    background: '#23a045',
                    border: 'none',
                    borderRadius: 10,
                    fontWeight: 600,
                    width: '100%'
                  }}
                >
                  Update Status
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Space>
    </>
  );

  const renderAdminInterventions = () => (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: 8, color: '#1a1a1a' }}>
        Gestion des interventions
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 32 }}>
        Planifier et suivre toutes les interventions techniques
      </Paragraph>
      {/* Placeholder for admin content - can reuse old table if needed */}
      <Card>
        <Title level={4}>Admin Interventions Page</Title>
        <Paragraph>This is the admin view for interventions.</Paragraph>
      </Card>
    </div>
  );

  return (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      {(userRole === 'TECHNICIEN' || userRole === 'Agronomist' || userRole === 'FARMER') 
        ? renderTechnicianInterventions() 
        : renderAdminInterventions()}
    </div>
  );
};

export default Interventions;
