import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes } from "lucide-react";
import usePortfolio from "../hooks/usePortfolio";
import ProjectGrid from "../components/ProjectGrid";
import CertificateGrid from "../components/CertificateGrid";
import TechStackGrid from "../components/TechStackGrid";

import {
    PORTFOLIO_HEADER,
    PORTFOLIO_TABS,
} from "../constants/portfolio.constant";

import {
    TOGGLE_BUTTON
} from "../../../constants";

import {
    AOS_CONFIG
} from "../../../constants";

import {
    PORTFOLIO_SECTION_ID
} from "../constants/portfolio.ui.constant";



const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {
          isShowingMore
              ? TOGGLE_BUTTON.SHOW_LESS
              : TOGGLE_BUTTON.SHOW_MORE
      }
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();

  const {
      projects,
      certificates,

      activeTab,
      setActiveTab,

      showAllProjects,
      showAllCertificates,

      toggleShowMore,

      initialItems,

      displayedProjects,
      displayedCertificates,

  } = usePortfolio();

  useEffect(() => {
    AOS.init(AOS_CONFIG);
  }, []);
  
  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id={PORTFOLIO_SECTION_ID}>
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {PORTFOLIO_HEADER.title}
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          {PORTFOLIO_HEADER.subtitle}
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={activeTab}
            onChange={(event,newValue)=>setActiveTab(newValue)}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            {PORTFOLIO_TABS.map(({ label, icon: Icon }, index) => (
              <Tab
                  key={label}
                  icon={
                      <Icon
                          className="mb-2 w-5 h-5 transition-all duration-300"
                      />
                  }
                  label={label}
                  {...a11yProps(index)}
              />
          ))}
          </Tabs>
        </AppBar>

        <>
          <TabPanel value={activeTab} index={0} dir={theme.direction}>

              <ProjectGrid
                  displayedProjects={displayedProjects}
              />


              {
                  projects.length > initialItems && (

                      <div className="mt-6 w-full flex justify-start">

                          <ToggleButton
                              onClick={() => toggleShowMore("projects")}
                              isShowingMore={showAllProjects}
                          />

                      </div>

                  )
              }

          </TabPanel>

          <TabPanel value={activeTab} index={1} dir={theme.direction}>

              <CertificateGrid
                  displayedCertificates={displayedCertificates}
              />


              {
                  certificates.length > initialItems && (

                      <div className="mt-6 w-full flex justify-start">

                          <ToggleButton
                              onClick={() => toggleShowMore("certificates")}
                              isShowingMore={showAllCertificates}
                          />

                      </div>

                  )
              }

          </TabPanel>

          <TabPanel value={activeTab} index={2} dir={theme.direction}>

              <TechStackGrid />

          </TabPanel>
        </>
      </Box>
    </div>
  );
}
