import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ImageList,
  ImageListItem,
  Dialog,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Carousel, Rate } from "antd";
import {
  ArrowBack,
  Phone,
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

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

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "white", fontWeight: 600 }}
            >
              {car.brand} {car.model}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
              {car.year} • {formatMileage(car.mileage)} • {car.fuelType}
            </Typography>
          </Box>

          <Chip
            label={car.condition}
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              color: "#667eea",
              fontWeight: 600,
              mr: 2,
            }}
          />

          <IconButton
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.2)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.3)",
              },
            }}
            onClick={() => window.print()}
          >
            <Print />
          </IconButton>

          <IconButton
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.2)",
              ml: 1,
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
            <Share />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - Images */}
          <Grid item xs={12} md={8}>
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
                        height: 400,
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
                <ImageList sx={{ m: 2 }} cols={4} rowHeight={120}>
                  {allImages.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image}
                        alt={`${car.brand} ${car.model} ${index + 1}`}
                        loading="lazy"
                        style={{
                          cursor: "pointer",
                          objectFit: "cover",
                          height: "100%",
                        }}
                        onClick={() => handleImageClick(index)}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
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

              <Divider sx={{ my: 3 }} />

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

          {/* Right Column - Price and Contact */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, position: "sticky", top: 80 }}>
              <Typography
                variant="h4"
                color="error"
                gutterBottom
                fontWeight={700}
              >
                {formatPrice(car.price)}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Đánh giá chất lượng xe:
                </Typography>
                <Rate defaultValue={4.5} disabled allowHalf />
              </Box>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
                <Chip label={`Năm ${car.year}`} />
                <Chip label={car.condition} color="success" />
                {car.status === "available" ? (
                  <Chip label="Còn hàng" color="primary" />
                ) : car.status === "sold" ? (
                  <Chip label="Đã bán" color="error" />
                ) : (
                  <Chip label="Đã đặt" color="warning" />
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Liên hệ
              </Typography>

              {car.contactName && (
                <Typography variant="body1" gutterBottom>
                  {car.contactName}
                </Typography>
              )}

              <Box
                sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<Phone />}
                  href={`tel:${car.contactPhone || "0975224557"}`}
                >
                  {car.contactPhone || "0975 224 557"}
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    background:
                      "linear-gradient(45deg, #0088cc 30%, #00aaff 90%)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #0077bb 30%, #0099ee 90%)",
                    },
                  }}
                  onClick={() =>
                    window.open(
                      `https://zalo.me/${car.contactPhone || "0975224557"}`,
                      "_blank",
                    )
                  }
                >
                  Chat qua Zalo
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{ borderColor: "#1877f2", color: "#1877f2" }}
                  onClick={() =>
                    window.open("https://m.me/vubachauto", "_blank")
                  }
                >
                  Chat qua Messenger
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                  Cam kết của chúng tôi
                </Typography>
                <List dense>
                  <ListItem disableGutters>
                    <ListItemText primary="✓ Xe đã kiểm định chất lượng" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText primary="✓ Giấy tờ pháp lý đầy đủ" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText primary="✓ Bảo hành 6 tháng" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText primary="✓ Hỗ trợ trả góp lãi suất ưu đãi" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
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
