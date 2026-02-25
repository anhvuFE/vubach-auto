import React, { useState, useEffect } from 'react';
import {
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Space,
  Popconfirm,
  Tag,
  Row,
  Col,
  Tabs,
} from 'antd';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Grid,
  Avatar,
  Button as MuiButton,
} from '@mui/material';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
  CarOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import {
  Home as HomeIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useCarStore from '@/store/carStore';
import { Car } from '@/types/car';
import { fileToBase64 } from '@/services/imageUpload';

const { TextArea } = Input;

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const {
    cars,
    isAuthenticated,
    login,
    logout,
    addCar,
    updateCar,
    deleteCar,
    exportData,
    importData,
    resetData,
  } = useCarStore();

  const [loginModalVisible, setLoginModalVisible] = useState(!isAuthenticated);
  const [carModalVisible, setCarModalVisible] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [form] = Form.useForm();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [loginForm] = Form.useForm();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoginModalVisible(true);
    }
  }, [isAuthenticated]);

  const handleLogin = (values: { password: string }) => {
    if (login(values.password)) {
      setLoginModalVisible(false);
      message.success('Đăng nhập thành công!');
    } else {
      message.error('Mật khẩu không đúng!');
    }
  };

  const handleAddEditCar = async (values: any) => {
    try {
      // Convert uploaded images to base64
      const imageUrls: string[] = [];
      if (values.images?.fileList) {
        for (const file of values.images.fileList) {
          if (file.originFileObj) {
            const base64 = await fileToBase64(file.originFileObj);
            imageUrls.push(base64);
          }
        }
      }

      const carData = {
        ...values,
        images: imageUrls.length > 0 ? imageUrls : editingCar?.images || [],
        mainImage: imageUrls[0] || editingCar?.mainImage || '',
        features: values.features ? values.features.split(',').map((f: string) => f.trim()) : [],
      };

      if (editingCar) {
        updateCar(editingCar.id, carData);
        message.success('Cập nhật xe thành công!');
      } else {
        addCar(carData);
        message.success('Thêm xe mới thành công!');
      }

      setCarModalVisible(false);
      form.resetFields();
      setEditingCar(null);
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    form.setFieldsValue({
      ...car,
      features: car.features.join(', '),
    });
    setCarModalVisible(true);
  };

  const handleDelete = (id: string) => {
    deleteCar(id);
    message.success('Xóa xe thành công!');
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vubach-auto-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    message.success('Xuất dữ liệu thành công!');
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (importData(content)) {
        message.success('Import dữ liệu thành công!');
      } else {
        message.error('Import thất bại! Vui lòng kiểm tra file.');
      }
    };
    reader.readAsText(file);
    return false;
  };

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'mainImage',
      key: 'mainImage',
      width: 100,
      render: (image: string) => (
        <img src={image} alt="car" style={{ width: 80, height: 60, objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Thông tin xe',
      key: 'info',
      render: (_: any, record: Car) => (
        <Space size="small" style={{ display: 'flex', flexDirection: 'column' }}>
          <strong>{record.brand} {record.model}</strong>
          <span>Năm: {record.year} | ODO: {record.mileage.toLocaleString()} km</span>
        </Space>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <strong style={{ color: '#f5222d' }}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
        </strong>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'available' ? 'green' : status === 'sold' ? 'red' : 'orange'}>
          {status === 'available' ? 'Còn hàng' : status === 'sold' ? 'Đã bán' : 'Đã đặt'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Car) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa xe này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const stats = {
    totalCars: cars.length,
    availableCars: cars.filter(c => c.status === 'available').length,
    soldCars: cars.filter(c => c.status === 'sold').length,
    totalValue: cars.filter(c => c.status === 'available').reduce((sum, c) => sum + c.price, 0),
  };

  if (!isAuthenticated) {
    return (
      <Modal
        title="Đăng nhập Admin"
        open={loginModalVisible}
        footer={null}
        closable={false}
      >
        <Form form={loginForm} onFinish={handleLogin}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password placeholder="Nhập mật khẩu admin" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
              <Button onClick={() => navigate('/')}>
                Quay lại trang chủ
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <div style={{ marginTop: 16, color: '#888' }}>
          Mật khẩu mặc định: admin123
        </div>
      </Modal>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Modern AppBar with MUI */}
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#1976d2' }}>
                <DashboardIcon />
              </Avatar>
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  fontWeight: 600,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Vũ Bách Auto - Admin Panel
              </Typography>
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  fontWeight: 600,
                  display: { xs: 'block', sm: 'none' }
                }}
              >
                Admin
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <MuiButton
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                Trang chủ
              </MuiButton>
              <IconButton
                onClick={() => navigate('/')}
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              >
                <HomeIcon />
              </IconButton>

              <MuiButton
                variant="contained"
                startIcon={<LogoutIcon />}
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                Đăng xuất
              </MuiButton>
              <IconButton
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Statistics with MUI */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'white',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                }
              }}
            >
              <Avatar sx={{ bgcolor: '#1976d2', mb: 2, width: 48, height: 48 }}>
                <CarOutlined style={{ fontSize: 24 }} />
              </Avatar>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#1976d2' }}>
                {stats.totalCars}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Tổng số xe
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'white',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                }
              }}
            >
              <Avatar sx={{ bgcolor: '#4caf50', mb: 2, width: 48, height: 48 }}>
                <CarOutlined style={{ fontSize: 24 }} />
              </Avatar>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#4caf50' }}>
                {stats.availableCars}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Xe đang bán
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'white',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                }
              }}
            >
              <Avatar sx={{ bgcolor: '#f44336', mb: 2, width: 48, height: 48 }}>
                <CarOutlined style={{ fontSize: 24 }} />
              </Avatar>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#f44336' }}>
                {stats.soldCars}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Xe đã bán
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'white',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                }
              }}
            >
              <Avatar sx={{ bgcolor: '#ff9800', mb: 2, width: 48, height: 48 }}>
                <DollarOutlined style={{ fontSize: 24 }} />
              </Avatar>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#ff9800' }}>
                {(stats.totalValue / 1000000).toFixed(0)}M
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Tổng giá trị (₫)
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Tabs
            defaultActiveKey="cars"
            size="large"
            items={[
              {
                key: 'cars',
                label: 'Quản lý xe',
                children: (
                  <Box sx={{ p: 3 }}>
                  <Space wrap style={{ marginBottom: 16, width: '100%' }}>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setEditingCar(null);
                        form.resetFields();
                        setCarModalVisible(true);
                      }}
                    >
                      Thêm xe mới
                    </Button>
                    <Button icon={<DownloadOutlined />} onClick={handleExport}>
                      Xuất dữ liệu
                    </Button>
                    <Upload
                      accept=".json"
                      showUploadList={false}
                      beforeUpload={handleImport}
                    >
                      <Button icon={<UploadOutlined />}>Import dữ liệu</Button>
                    </Upload>
                    <Popconfirm
                      title="Bạn có chắc muốn xóa toàn bộ dữ liệu?"
                      onConfirm={() => {
                        resetData();
                        message.success('Đã xóa toàn bộ dữ liệu!');
                      }}
                    >
                      <Button danger>Reset dữ liệu</Button>
                    </Popconfirm>
                  </Space>

                    <div style={{ overflowX: 'auto' }}>
                      <Table
                        dataSource={cars}
                        columns={columns}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 800 }}
                      />
                    </div>
                  </Box>
              ),
            },
            {
              key: 'settings',
              label: 'Cài đặt',
              children: (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Hướng dẫn sử dụng
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Thêm/Sửa/Xóa xe trong tab Quản lý xe
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Upload ảnh xe (sẽ chuyển thành base64 lưu local)
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Xuất dữ liệu để backup
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Import dữ liệu từ file JSON đã backup
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Để upload ảnh lên cloud (ImgBB), cần đăng ký và lấy API key
                    </Typography>
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                    Thông tin hệ thống
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    Dữ liệu được lưu trữ trong Local Storage của trình duyệt
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    Dung lượng tối đa: ~5-10MB
                  </Typography>
                  <Typography>
                    Khuyến nghị: Thường xuyên backup dữ liệu
                  </Typography>
                </Box>
              ),
            },
          ]}
        />
        </Paper>

        {/* Add/Edit Car Modal */}
        <Modal
          title={editingCar ? 'Sửa thông tin xe' : 'Thêm xe mới'}
          open={carModalVisible}
          onCancel={() => {
            setCarModalVisible(false);
            setEditingCar(null);
            form.resetFields();
          }}
          footer={null}
          width={800}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddEditCar}
            initialValues={{ status: 'available' }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="brand" label="Hãng xe" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="model" label="Mẫu xe" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="year" label="Năm sản xuất" rules={[{ required: true }]}>
                  <InputNumber style={{ width: '100%' }} min={1990} max={2024} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true }]}>
                  <InputNumber style={{ width: '100%' }} min={0} step={1000000} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="mileage" label="Số km" rules={[{ required: true }]}>
                  <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="transmission" label="Hộp số" rules={[{ required: true }]}>
                  <Select>
                    <Select.Option value="Manual">Số sàn</Select.Option>
                    <Select.Option value="Automatic">Tự động</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="fuelType" label="Nhiên liệu" rules={[{ required: true }]}>
                  <Select>
                    <Select.Option value="Xăng">Xăng</Select.Option>
                    <Select.Option value="Dầu">Dầu</Select.Option>
                    <Select.Option value="Hybrid">Hybrid</Select.Option>
                    <Select.Option value="Điện">Điện</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="condition" label="Tình trạng" rules={[{ required: true }]}>
                  <Select>
                    <Select.Option value="Mới">Mới</Select.Option>
                    <Select.Option value="Như mới">Như mới</Select.Option>
                    <Select.Option value="Tốt">Tốt</Select.Option>
                    <Select.Option value="Trung bình">Trung bình</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="color" label="Màu sắc" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="seats" label="Số chỗ" rules={[{ required: true }]}>
                  <InputNumber style={{ width: '100%' }} min={2} max={16} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="origin" label="Xuất xứ" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item name="features" label="Tính năng (ngăn cách bằng dấu phẩy)">
              <TextArea rows={2} placeholder="VD: Camera 360, Cảm biến lùi, Cruise Control" />
            </Form.Item>

            <Form.Item name="images" label="Hình ảnh">
              <Upload
                listType="picture-card"
                multiple
                beforeUpload={() => false}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="contactName" label="Người liên hệ">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="contactPhone" label="Số điện thoại">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="status" label="Trạng thái">
              <Select>
                <Select.Option value="available">Còn hàng</Select.Option>
                <Select.Option value="sold">Đã bán</Select.Option>
                <Select.Option value="reserved">Đã đặt</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingCar ? 'Cập nhật' : 'Thêm xe'}
                </Button>
                <Button onClick={() => {
                  setCarModalVisible(false);
                  setEditingCar(null);
                  form.resetFields();
                }}>
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    </Box>
  );
};

export default AdminPanel;