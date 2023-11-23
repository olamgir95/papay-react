import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Container, Stack } from "@mui/material";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Events() {
  const events_list = [
    {
      title: "Bo'yin Foodga marhamat",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "Abdurahmon Mufid",
      date: "2023/11/16",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/boyinfood.png",
    },
    {
      title: "Katta Chegirma endi Bellissimoda",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "BellissiomoUz",
      date: "2023/10/16",
      location: "Toshkent, Qo'yliq",
      img: "/restaurant/bellissimo.png",
    },
    {
      title: "Bo'yin Foodga marhamat",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "Abdurahmon Mufid",
      date: "2023/11/16",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/boyinfood.png",
    },
    {
      title: "Bo'yin Foodga marhamat",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "Abdurahmon Mufid",
      date: "2023/11/16",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/boyinfood.png",
    },
    {
      title: "Bo'yin Foodga marhamat",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "Abdurahmon Mufid",
      date: "2023/11/16",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/boyinfood.png",
    },
    {
      title: "Bo'yin Foodga marhamat",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "Abdurahmon Mufid",
      date: "2023/11/16",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/boyinfood.png",
    },
  ];

  return (
    <div className="events_frame">
      <Container sx={{ overflow: "hidden" }}>
        <Stack className="events_main">
          <Box className="events_text">
            <span className="category_title">Hodisalar</span>
          </Box>
          <Box className="prev_next_frame">
            <img src="icons/arrow-left.svg" className="button-prev" alt="" />
            <div className="dot_frame_pagination swiper-pagination"></div>
            <img src="icons/arrow-right.svg" className="button-next" alt="" />
          </Box>
          <Swiper
            className="events_info swiper-wrapper"
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            navigation={{
              nextEl: ".button-next",
              prevEl: ".button-prev",
            }}
            pagination={{
              el: ".swiper-pagination", // Use a valid DOM element here
              clickable: true,
            }}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
          >
            {events_list.map((value, number) => {
              return (
                <SwiperSlide key={number} className="events_info_frame">
                  <Box className="events_img">
                    <img src={value.img} className="events_img" alt="" />
                  </Box>
                  <Box className="events_desc">
                    <Box className="events_bott">
                      <Box className="bott_left">
                        <div className="event_title_speaker">
                          <strong>{value.title}</strong>
                          <div className="event_organizator">
                            <img src="/icons/speaker.svg" alt="" />
                            <p className="spec_text_author">{value.author}</p>
                          </div>
                        </div>
                        <p className="text_desc">{value.desc}</p>
                        <div className="bott_info">
                          <div className="bott_info_main">
                            <img src="/icons/calendar.svg" alt="" />{" "}
                            {value.date}
                          </div>
                          <div className="bott_info_main">
                            <img src="/icons/location.svg" alt="" />
                            {value.location}
                          </div>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
}
