import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
} from "@mui/material";
import {
  Layout,
  Input,
  FloatButton,
  message,
  Dropdown,
  Button as AntButton,
  Card,
  Row,
  Col,
  Tag,
  Space,
  Statistic,
  Image,
} from "antd";
import {
  PhoneOutlined,
  MessageOutlined,
  FacebookOutlined,
  CarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  MailOutlined,
  CommentOutlined,
  CalendarOutlined,
  DashboardOutlined,
  ToolOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import {
  DirectionsCar,
  Home,
  Info,
  ContactPhone,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useCarStore from "@/store/carStore";
import { mockCars } from "@/utils/mockData";

const { Header } = Layout;
const { Search: AntSearch } = Input;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { cars, addCar, resetData } = useCarStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize with mock data if empty
  useEffect(() => {
    if (cars.length === 0) {
      mockCars.forEach((car) => addCar(car));
    }
  }, []);

  const handleResetData = () => {
    resetData();
    mockCars.forEach((car) => addCar(car));
    message.info("Đã làm mới dữ liệu xe!");
  };

  const filteredCars = cars.filter(
    (car) =>
      car.status === "available" &&
      (car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase())),
  );


  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("vi-VN").format(mileage) + " km";
  };

  const adminMenuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Admin Panel",
      onClick: () => navigate("/admin"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Header using Ant Design */}
      <Header
        style={{
          background: "white",
          padding: "0 16px",
          borderBottom: "1px solid #e8e8e8",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: "auto",
          lineHeight: "normal",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: { xs: 1.5, sm: 2 },
            maxWidth: "1200px",
            margin: "0 auto",
            gap: { xs: 2, sm: 3 },
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              minWidth: "160px",
            }}
          >
            <CarOutlined
              style={{
                fontSize: 28,
                color: "#1976d2",
                padding: "8px",
                background: "#e3f2fd",
                borderRadius: "8px",
              }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
                color: "#1976d2",
                display: { xs: "none", sm: "block" },
              }}
            >
              Vũ Bách Auto
            </Typography>
          </Box>

          {/* Search - Hidden on mobile */}
          <Box
            sx={{
              flex: 1,
              maxWidth: 400,
              display: { xs: "none", lg: "block" },
            }}
          >
            <AntSearch
              placeholder="Tìm kiếm hãng xe..."
              allowClear
              enterButton="Tìm"
              size="middle"
              style={{
                width: "100%",
              }}
              onSearch={(value) => setSearchTerm(value)}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <AntButton
              type="primary"
              icon={<PhoneOutlined />}
              href="tel:0975224557"
              size="large"
              style={{
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  display: windowWidth < 576 ? "none" : "inline",
                  marginLeft: "4px"
                }}
              >
                0975 224 557
              </span>
            </AntButton>

            <AntButton
              onClick={handleResetData}
              size="large"
              style={{
                display: windowWidth < 768 ? "none" : "inline-flex",
              }}
            >
              Reset
            </AntButton>

            <Dropdown menu={{ items: adminMenuItems }} placement="bottomRight">
              <AntButton
                type="text"
                icon={<UserOutlined />}
                size="large"
                style={{
                  border: "1px solid #d9d9d9",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {windowWidth >= 576 && <span style={{ marginLeft: "4px" }}>Admin</span>}
              </AntButton>
            </Dropdown>
          </Box>
        </Box>

      </Header>

      {/* Hero Section with Banner Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 250, sm: 350, md: 450 },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="https://hyundaingocphat.com/source/News/Gioi%20Thieu/banner%20web.jpg"
          alt="Vũ Bách Auto Banner"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: {
              xs: "center 25%", // Mobile: crop more from bottom to hide phone
              sm: "center 28%", // Tablet: slightly less crop
              md: "center 30%", // Desktop: show more
            },
          }}
        />
      </Box>

      {/* Cars Grid using Ant Design */}
      <div style={{ padding: "48px 24px", backgroundColor: "#f8f9fa" }}>
        <Container>
          <Typography
            variant="h4"
            component="h2"
            fontWeight={700}
            sx={{
              mb: 4,
              fontSize: { xs: "1.75rem", md: "2.125rem" },
              color: "#1a1a1a",
              textAlign: "center",
            }}
          >
            Xe đang bán ({filteredCars.length})
          </Typography>

          <Row gutter={[24, 24]}>
            {filteredCars.map((car) => (
              <Col xs={24} sm={12} lg={8} key={car.id}>
                <Card
                  hoverable
                  style={{
                    height: "100%",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                  bodyStyle={{ padding: "20px" }}
                  cover={
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <Image
                        alt={`${car.brand} ${car.model}`}
                        src={car.mainImage}
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                        }}
                        fallback="https://via.placeholder.com/400x300?text=Car+Image"
                        preview={false}
                      />
                    </div>
                  }
                  onClick={() => navigate(`/car/${car.id}`)}
                >
                  <Card.Meta
                    title={
                      <Space direction="vertical" size={4} style={{ width: "100%" }}>
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#1a1a1a",
                          }}
                        >
                          {car.brand} {car.model}
                        </span>
                        <Statistic
                          value={car.price}
                          precision={0}
                          valueStyle={{
                            color: "#dc2626",
                            fontSize: "20px",
                            fontWeight: 700,
                          }}
                          formatter={(value) =>
                            new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(Number(value))
                          }
                        />
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={12} style={{ width: "100%" }}>
                        <Space wrap>
                          <Tag icon={<CalendarOutlined />} color="blue">
                            {car.year}
                          </Tag>
                          <Tag icon={<DashboardOutlined />} color="green">
                            {formatMileage(car.mileage)}
                          </Tag>
                          <Tag icon={<ToolOutlined />} color="orange">
                            {car.transmission === "Automatic" ? "Tự động" : "Số sàn"}
                          </Tag>
                          <Tag
                            icon={<SafetyCertificateOutlined />}
                            color={car.fuelType === "Điện" ? "cyan" : "default"}
                          >
                            {car.fuelType}
                          </Tag>
                        </Space>

                        <p
                          style={{
                            color: "#6b7280",
                            fontSize: "14px",
                            lineHeight: "1.4",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            margin: 0,
                          }}
                        >
                          {car.description}
                        </p>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Tag color="success" style={{ fontWeight: 600 }}>
                            {car.condition}
                          </Tag>
                          <span style={{ color: "#8c8c8c", fontSize: "12px" }}>
                            {car.seats} chỗ • {car.color}
                          </span>
                        </div>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {filteredCars.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <Typography variant="h6" color="text.secondary">
                Không tìm thấy xe phù hợp
              </Typography>
            </div>
          )}
        </Container>
      </div>

      {/* Footer using Ant Design */}
      <footer
        style={{
          backgroundColor: "#1a1a1a",
          color: "white",
          padding: "48px 0",
          marginTop: "auto",
        }}
      >
        <Container>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <Space direction="vertical" size={16}>
                <Space align="center">
                  <DirectionsCar style={{ color: "#1976d2", fontSize: 24 }} />
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    style={{ color: "white", margin: 0 }}
                  >
                    Vũ Bách Auto
                  </Typography>
                </Space>
                <Space direction="vertical" size={8}>
                  <Space align="center">
                    <EnvironmentOutlined style={{ color: "#1976d2" }} />
                    <span style={{ color: "rgba(255,255,255,0.85)" }}>
                      177 Trường Chinh, Thành Phố Hải Dương
                    </span>
                  </Space>
                  <Space align="center">
                    <PhoneOutlined style={{ color: "#1976d2" }} />
                    <span style={{ color: "rgba(255,255,255,0.85)" }}>
                      Hotline: 0975 224 557
                    </span>
                  </Space>
                  <Space align="center">
                    <MailOutlined style={{ color: "#1976d2" }} />
                    <span style={{ color: "rgba(255,255,255,0.85)" }}>
                      contact@vubach-auto.com
                    </span>
                  </Space>
                </Space>
              </Space>
            </Col>

            <Col xs={24} md={8}>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight={600}
                style={{ color: "white" }}
              >
                Dịch vụ
              </Typography>
              <Space direction="vertical" size={8}>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  ✓ Mua bán xe ô tô cũ
                </span>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  ✓ Tư vấn chọn xe phù hợp
                </span>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  ✓ Hỗ trợ thủ tục sang tên
                </span>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  ✓ Vay trả góp lãi suất ưu đãi
                </span>
              </Space>
            </Col>

            <Col xs={24} md={8}>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight={600}
                style={{ color: "white" }}
              >
                Cam kết
              </Typography>
              <Space direction="vertical" size={8}>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  ✓ Xe đã qua kiểm định chất lượng
                </span>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  ✓ Giấy tờ pháp lý rõ ràng
                </span>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  ✓ Bảo hành 6 tháng
                </span>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  ✓ Test xe thoải mái
                </span>
              </Space>
            </Col>
          </Row>

          <Divider style={{ margin: "32px 0", backgroundColor: "rgba(255,255,255,0.1)" }} />

          <BottomNavigation
            sx={{
              bgcolor: "transparent",
              "& .MuiBottomNavigationAction-root": {
                color: "rgba(255,255,255,0.7)",
                "&.Mui-selected": {
                  color: "#1976d2",
                },
              },
            }}
            showLabels
          >
            <BottomNavigationAction
              label="Trang chủ"
              icon={<Home />}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <BottomNavigationAction label="Về chúng tôi" icon={<Info />} />
            <BottomNavigationAction
              label="Liên hệ"
              icon={<ContactPhone />}
              href="tel:0975224557"
            />
          </BottomNavigation>

          <div style={{ textAlign: "center", marginTop: 16, opacity: 0.7 }}>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>
              © 2024 Vũ Bách Auto. All rights reserved.
            </span>
          </div>
        </Container>
      </footer>

      {/* Floating buttons using Ant Design */}
      <FloatButton.Group
        shape="circle"
        style={{
          right: windowWidth < 576 ? 16 : 24,
          bottom: windowWidth < 576 ? 16 : 24,
        }}
      >
        <FloatButton
          icon={<PhoneOutlined style={{ color: "#fff" }} />}
          tooltip="Gọi ngay: 0975 224 557"
          onClick={() => (window.location.href = "tel:0975224557")}
          badge={{ count: 1 }}
          style={{
            background: "#25d366",
          }}
        />
        <FloatButton
          icon={<CommentOutlined style={{ color: "#fff" }} />}
          tooltip="Chat Zalo"
          onClick={() => window.open("https://zalo.me/0975224557", "_blank")}
          style={{
            background: "#0068ff",
          }}
        />
        <FloatButton
          icon={<MessageOutlined style={{ color: "#fff" }} />}
          tooltip="Messenger"
          onClick={() => window.open("https://m.me/vubachauto", "_blank")}
          style={{
            background: "linear-gradient(45deg, #00C6FF, #0078FF, #8B00FF)",
          }}
        />
        <FloatButton
          icon={<FacebookOutlined style={{ color: "#fff" }} />}
          tooltip="Facebook"
          onClick={() =>
            window.open("https://facebook.com/vubachauto", "_blank")
          }
          style={{
            background: "#1877f2",
          }}
        />
        <FloatButton.BackTop visibilityHeight={400} />
      </FloatButton.Group>
    </Layout>
  );
};

export default HomePage;
