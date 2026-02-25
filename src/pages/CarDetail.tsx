import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Paper,
  Dialog,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  Carousel,
  Rate,
  Card,
  Statistic,
  Space,
  Button as AntButton,
  Divider as AntDivider,
  List as AntList
} from "antd";
import {
  ArrowBack,
  CheckCircle,
  Speed,
  LocalGasStation,
  Settings,
  EventSeat,
  Palette,
  Public,
  Close,
  NavigateBefore,
  NavigateNext,
  Print,
  Share,
} from "@mui/icons-material";
import {
  PhoneOutlined,
  UserOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import useCarStore from "@/store/carStore";

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCar } = useCarStore();
  const [car, setCar] = useState(getCar(id || ""));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  useEffect(() => {
    if (!car && id) {
      const carData = getCar(id);
      if (carData) {
        setCar(carData);
      } else {
        navigate("/");
      }
    }
  }, [id, car, getCar, navigate]);

  if (!car) {
    return null;
  }


  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("vi-VN").format(mileage) + " km";
  };

  const allImages = [
    car.mainImage,
    ...car.images.filter((img) => img !== car.mainImage),
  ];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setImageDialogOpen(true);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", pb: 4 }}>
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderBottom: "none",
        }}
      >
        <Toolbar sx={{ minHeight: 70 }}>
          <IconButton
            edge="start"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.3)",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s",
            }}
          >
            <ArrowBack />
          </IconButton>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {car.brand} {car.model}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {car.year} • {formatMileage(car.mileage)} • {car.fuelType}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
            <Chip
              label={car.condition}
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                color: "#667eea",
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                height: { xs: 24, sm: 32 },
                display: { xs: "none", sm: "flex" },
              }}
            />

            <IconButton
              size="small"
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.2)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.3)",
                },
              }}
              onClick={() => window.print()}
            >
              <Print fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.2)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.3)",
                },
              }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `${car.brand} ${car.model}`,
                    text: car.description,
                    url: window.location.href,
                  });
                }
              }}
            >
              <Share fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Left Column - Images */}
          <Grid item xs={12} md={7.5}>
            <Paper sx={{ overflow: "hidden" }}>
              {/* Main Image with Ant Design Carousel */}
              <Carousel autoplay>
                {allImages.map((image, index) => (
                  <div key={index}>
                    <Box
                      component="img"
                      src={image}
                      alt={`${car.brand} ${car.model}`}
                      sx={{
                        width: "100%",
                        height: { xs: 250, sm: 350, md: 400 },
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageClick(index)}
                    />
                  </div>
                ))}
              </Carousel>

              {/* Image Gallery */}
              {allImages.length > 1 && (
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={1}>
                    {allImages.map((image, index) => (
                      <Grid item xs={3} sm={3} md={3} key={index}>
                        <Box
                          component="img"
                          src={image}
                          alt={`${car.brand} ${car.model} ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: { xs: 60, sm: 80, md: 100 },
                            objectFit: "cover",
                            cursor: "pointer",
                            borderRadius: 1,
                            border: "2px solid transparent",
                            transition: "all 0.2s",
                            "&:hover": {
                              borderColor: "#1976d2",
                              transform: "scale(1.05)",
                            },
                          }}
                          onClick={() => handleImageClick(index)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Paper>

            {/* Car Details */}
            <Paper sx={{ mt: 3, p: 3 }}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Thông tin chi tiết
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "#fafafa",
                      borderRadius: 2,
                      border: "1px solid #e0e0e0",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#e3f2fd",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Speed sx={{ color: "#1976d2" }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Số km
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {formatMileage(car.mileage)}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "#fafafa",
                      borderRadius: 2,
                      border: "1px solid #e0e0e0",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor:
                            car.fuelType === "Điện" ? "#e8f5e9" : "#fff3e0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <LocalGasStation
                          sx={{
                            color:
                              car.fuelType === "Điện" ? "#4caf50" : "#ff9800",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Nhiên liệu
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {car.fuelType}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "#fafafa",
                      borderRadius: 2,
                      border: "1px solid #e0e0e0",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#fce4ec",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Settings sx={{ color: "#c2185b" }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Hộp số
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {car.transmission === "Automatic"
                            ? "Tự động"
                            : "Số sàn"}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "#fafafa",
                      borderRadius: 2,
                      border: "1px solid #e0e0e0",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#f3e5f5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <EventSeat sx={{ color: "#7b1fa2" }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Số chỗ
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {car.seats} chỗ
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "#fafafa",
                      borderRadius: 2,
                      border: "1px solid #e0e0e0",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#e0f2f1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Palette sx={{ color: "#00796b" }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Màu sắc
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {car.color}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "#fafafa",
                      borderRadius: 2,
                      border: "1px solid #e0e0e0",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#e8eaf6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Public sx={{ color: "#3f51b5" }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Xuất xứ
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {car.origin}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <AntDivider />

              <Typography variant="h6" gutterBottom fontWeight={600}>
                Mô tả
              </Typography>
              <Typography variant="body1" paragraph>
                {car.description}
              </Typography>

              {car.features.length > 0 && (
                <>
                  <Typography
                    variant="h6"
                    gutterBottom
                    fontWeight={600}
                    sx={{ mt: 4, mb: 3 }}
                  >
                    Tính năng nổi bật
                  </Typography>
                  <Grid container spacing={2}>
                    {car.features.map((feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: "#f8f9fa",
                            border: "1px solid #e9ecef",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            transition: "all 0.3s",
                            "&:hover": {
                              bgcolor: "#e3f2fd",
                              borderColor: "#1976d2",
                              transform: "translateX(4px)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              bgcolor: "#4caf50",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <CheckCircle
                              sx={{ color: "white", fontSize: 20 }}
                            />
                          </Box>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {feature}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Paper>
          </Grid>

          {/* Right Column - Price and Contact using Ant Design */}
          <Grid item xs={12} md={4.5}>
            <Card
              style={{
                position: "sticky",
                top: 80,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              bodyStyle={{ padding: "16px" }}
            >
              <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                {/* Price Section */}
                <div style={{ textAlign: "center" }}>
                  <Statistic
                    value={car.price}
                    precision={0}
                    valueStyle={{
                      color: "#dc2626",
                      fontSize: "32px",
                      fontWeight: 700,
                    }}
                    formatter={(value) =>
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(Number(value))
                    }
                  />
                </div>

                {/* Rating Section */}
                <div style={{ marginTop: "-8px" }}>
                  <p style={{ marginBottom: 6, color: "#666", fontSize: "13px" }}>
                    Đánh giá chất lượng xe:
                  </p>
                  <Rate defaultValue={4.5} disabled allowHalf size="small" />
                </div>

                {/* Tags Section */}
                <div style={{ marginTop: "-4px" }}>
                  <Space wrap size="small">
                    <span style={{
                      background: "#f0f0f0",
                      padding: "3px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#666"
                    }}>
                      Năm {car.year}
                    </span>
                    <span style={{
                      background: "#f6ffed",
                      color: "#52c41a",
                      padding: "3px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      border: "1px solid #b7eb8f"
                    }}>
                      {car.condition}
                    </span>
                    <span style={{
                      background: car.status === "available" ? "#e6f7ff" : car.status === "sold" ? "#fff2f0" : "#fff7e6",
                      color: car.status === "available" ? "#1890ff" : car.status === "sold" ? "#ff4d4f" : "#fa8c16",
                      padding: "3px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      border: `1px solid ${car.status === "available" ? "#91d5ff" : car.status === "sold" ? "#ffb3b3" : "#ffd666"}`
                    }}>
                      {car.status === "available" ? "Còn hàng" : car.status === "sold" ? "Đã bán" : "Đã đặt"}
                    </span>
                  </Space>
                </div>

                <AntDivider style={{ margin: "12px 0" }} />

                {/* Contact Section */}
                <div>
                  <h4 style={{
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#262626"
                  }}>
                    <UserOutlined style={{ color: "#1890ff" }} />
                    Liên hệ
                  </h4>

                  {car.contactName && (
                    <div style={{
                      marginBottom: 12,
                      padding: "12px",
                      background: "#f8f9fa",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#262626",
                      textAlign: "center",
                      border: "1px solid #e9ecef"
                    }}>
                      {car.contactName}
                    </div>
                  )}

                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <AntButton
                      type="primary"
                      size="middle"
                      block
                      icon={<PhoneOutlined />}
                      href={`tel:${car.contactPhone || "0975224557"}`}
                      style={{
                        height: "44px",
                        fontSize: "15px",
                        fontWeight: 600,
                        borderRadius: "8px",
                      }}
                    >
                      {car.contactPhone || "0975 224 557"}
                    </AntButton>

                    <AntButton
                      size="middle"
                      block
                      style={{
                        height: "44px",
                        fontSize: "15px",
                        fontWeight: 600,
                        background: "linear-gradient(135deg, #0068ff 0%, #0052cc 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                      }}
                      onClick={() =>
                        window.open(
                          `https://zalo.me/${car.contactPhone || "0975224557"}`,
                          "_blank",
                        )
                      }
                    >
                      Chat qua Zalo
                    </AntButton>

                    <AntButton
                      size="middle"
                      block
                      style={{
                        height: "44px",
                        fontSize: "15px",
                        fontWeight: 600,
                        borderColor: "#1877f2",
                        color: "#1877f2",
                        borderRadius: "8px",
                        borderWidth: "1px",
                      }}
                      onClick={() =>
                        window.open("https://m.me/vubachauto", "_blank")
                      }
                    >
                      Chat qua Messenger
                    </AntButton>
                  </Space>
                </div>

                <AntDivider style={{ margin: "12px 0" }} />

                {/* Commitment Section */}
                <Card
                  size="small"
                  title={
                    <span style={{ fontSize: "14px", fontWeight: 600 }}>
                      <SafetyCertificateOutlined style={{ marginRight: 6, color: "#52c41a" }} />
                      Cam kết của chúng tôi
                    </span>
                  }
                  style={{ backgroundColor: "#fafafa" }}
                  bodyStyle={{ padding: "8px 12px" }}
                >
                  <AntList
                    size="small"
                    dataSource={[
                      "Xe đã kiểm định chất lượng",
                      "Giấy tờ pháp lý đầy đủ",
                      "Bảo hành 6 tháng",
                      "Hỗ trợ trả góp lãi suất ưu đãi"
                    ]}
                    renderItem={(item: string) => (
                      <AntList.Item style={{ padding: "2px 0", border: "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: "12px" }} />
                          <span style={{ fontSize: "12px" }}>{item}</span>
                        </div>
                      </AntList.Item>
                    )}
                  />
                </Card>
              </Space>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Image Viewer Dialog */}
      <Dialog
        fullScreen
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        sx={{ bgcolor: "black" }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={() => setImageDialogOpen(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            <Close />
          </IconButton>

          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: "absolute",
              left: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            <NavigateBefore fontSize="large" />
          </IconButton>

          <IconButton
            onClick={handleNextImage}
            sx={{
              position: "absolute",
              right: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            <NavigateNext fontSize="large" />
          </IconButton>

          <img
            src={allImages[selectedImageIndex]}
            alt={`${car.brand} ${car.model}`}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
            }}
          />

          <Typography
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              px: 2,
              py: 1,
              borderRadius: 1,
            }}
          >
            {selectedImageIndex + 1} / {allImages.length}
          </Typography>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CarDetail;
