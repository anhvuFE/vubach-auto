import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Chip,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import {
  Layout,
  Input,
  Badge,
  FloatButton,
  message,
  Avatar,
  Dropdown,
  Button as AntButton,
} from "antd";
import {
  SearchOutlined,
  PhoneOutlined,
  MessageOutlined,
  FacebookOutlined,
  CarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  MailOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import {
  DirectionsCar,
  Home,
  Info,
  ContactPhone,
  AdminPanelSettings,
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

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
          padding: "0 8px",
          borderBottom: "1px solid #e0e0e0",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: "auto",
          lineHeight: "normal",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: { xs: 1, sm: 1.5 },
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: { xs: 1, sm: 2 },
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
              minWidth: { xs: "auto", sm: "180px" },
            }}
          >
            <CarOutlined style={{ fontSize: 20, color: "#1976d2" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.25rem" },
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
              maxWidth: { sm: 400, md: 500 },
              display: { xs: "none", sm: "block" },
              px: 2,
            }}
          >
            <AntSearch
              placeholder="Tìm kiếm xe..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              style={{ width: "100%" }}
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
            <Badge count={1} showZero>
              <AntButton
                type="primary"
                icon={<PhoneOutlined />}
                href="tel:0975224557"
                size="large"
                style={{
                  fontSize: "14px",
                  padding: "4px 8px",
                }}
              >
                <span
                  style={{ display: windowWidth < 400 ? "none" : "inline" }}
                >
                  0975 224 557
                </span>
              </AntButton>
            </Badge>

            <AntButton
              onClick={handleResetData}
              size="large"
              style={{
                display: windowWidth < 576 ? "none" : "inline-flex",
              }}
            >
              Reset
            </AntButton>

            <Dropdown menu={{ items: adminMenuItems }} placement="bottomRight">
              <Avatar
                style={{ backgroundColor: "#1976d2", cursor: "pointer" }}
                icon={<AdminPanelSettings />}
                size={windowWidth < 576 ? "default" : "large"}
              />
            </Dropdown>
          </Box>
        </Box>

        {/* Mobile Search */}
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            width: "100%",
            pb: 1,
          }}
        >
          <AntSearch
            placeholder="Tìm kiếm xe..."
            allowClear
            enterButton={<SearchOutlined />}
            size="middle"
            style={{ width: "100%" }}
            onSearch={(value) => setSearchTerm(value)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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

      {/* Cars Grid */}
      <Container sx={{ py: { xs: 3, sm: 4, md: 6 }, bgcolor: "#f8f9fa" }}>
        <Typography
          variant="h4"
          component="h2"
          fontWeight={700}
          sx={{
            mb: 4,
            fontSize: { xs: "1.75rem", md: "2.125rem" },
            color: "#1a1a1a",
          }}
        >
          Xe đang bán ({filteredCars.length})
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {filteredCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: "none",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                  },
                }}
                onClick={() => navigate(`/car/${car.id}`)}
              >
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "66.67%",
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={car.mainImage}
                    alt={`${car.brand} ${car.model}`}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                    onError={(e: any) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=" +
                        encodeURIComponent(car.brand + " " + car.model);
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3 } }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    fontWeight={600}
                    sx={{
                      mb: 1.5,
                      fontSize: "1.125rem",
                      color: "#1a1a1a",
                    }}
                  >
                    {car.brand} {car.model}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      color: "#dc2626",
                      fontWeight: 700,
                      mb: 2,
                      fontSize: "1.5rem",
                    }}
                  >
                    {formatPrice(car.price)}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 2, gap: 0.5 }}
                  >
                    <Chip
                      label={car.year}
                      size="small"
                      sx={{
                        bgcolor: "#f3f4f6",
                        color: "#4b5563",
                        fontWeight: 500,
                        border: "none",
                      }}
                    />
                    <Chip
                      label={formatMileage(car.mileage)}
                      size="small"
                      sx={{
                        bgcolor: "#f3f4f6",
                        color: "#4b5563",
                        fontWeight: 500,
                        border: "none",
                      }}
                    />
                    <Chip
                      label={
                        car.transmission === "Automatic" ? "Tự động" : "Số sàn"
                      }
                      size="small"
                      sx={{
                        bgcolor: "#f3f4f6",
                        color: "#4b5563",
                        fontWeight: 500,
                        border: "none",
                      }}
                    />
                    <Chip
                      label={car.fuelType}
                      size="small"
                      sx={{
                        bgcolor:
                          car.fuelType === "Điện" ? "#dcfce7" : "#f3f4f6",
                        color: car.fuelType === "Điện" ? "#16a34a" : "#4b5563",
                        fontWeight: 500,
                        border: "none",
                      }}
                    />
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6b7280",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.5,
                      mb: 2,
                    }}
                  >
                    {car.description}
                  </Typography>

                  <Box>
                    <Chip
                      label={car.condition}
                      size="small"
                      sx={{
                        bgcolor: "#dcfce7",
                        color: "#16a34a",
                        fontWeight: 600,
                        border: "1px solid #86efac",
                        px: 1.5,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredCars.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Không tìm thấy xe phù hợp
            </Typography>
          </Box>
        )}
      </Container>

      {/* Footer using MUI BottomNavigation */}
      <Paper
        sx={{
          bgcolor: "#1a1a1a",
          color: "white",
          py: { xs: 3, sm: 4, md: 6 },
          mt: "auto",
        }}
        component="footer"
      >
        <Container>
          <Grid container spacing={{ xs: 3, sm: 3, md: 4 }}>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DirectionsCar sx={{ color: "#1976d2" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Vũ Bách Auto
                  </Typography>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EnvironmentOutlined style={{ color: "#1976d2" }} />
                    <Typography variant="body2">
                      177 Trường Chinh, Thành Phố Hải Dương
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <PhoneOutlined style={{ color: "#1976d2" }} />
                    <Typography variant="body2">
                      Hotline: 0975 224 557
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <MailOutlined style={{ color: "#1976d2" }} />
                    <Typography variant="body2">
                      contact@vubach-auto.com
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Dịch vụ
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">✓ Mua bán xe ô tô cũ</Typography>
                <Typography variant="body2">
                  ✓ Tư vấn chọn xe phù hợp
                </Typography>
                <Typography variant="body2">
                  ✓ Hỗ trợ thủ tục sang tên
                </Typography>
                <Typography variant="body2">
                  ✓ Vay trả góp lãi suất ưu đãi
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Cam kết
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  ✓ Xe đã qua kiểm định chất lượng
                </Typography>
                <Typography variant="body2">
                  ✓ Giấy tờ pháp lý rõ ràng
                </Typography>
                <Typography variant="body2">✓ Bảo hành 6 tháng</Typography>
                <Typography variant="body2">✓ Test xe thoải mái</Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, bgcolor: "rgba(255,255,255,0.1)" }} />

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

          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", opacity: 0.7 }}
          >
            © 2024 Vũ Bách Auto. All rights reserved.
          </Typography>
        </Container>
      </Paper>

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
