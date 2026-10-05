const coursesList = [
  {
    level: "Level 01 — Foundation",
    name: "DGCA Remote Pilot Certificate (Small Class)",
    description:
      "Your entry point into professional drone operations. Government-certified training for Small Class drones (up to 25kg) covering 90%+ of commercial applications.",
    lessons:
      "5 Days (Basic Flight Ops, DGCA Regulations, Safety Protocols, Mission Planning & Emergency Procedures)",
    certificate: "Yes (DGCA Remote Pilot Certificate)",
    price: "₹35,000 - ₹50,000",
  },
  {
    level: "Level 02 — Specialisation",
    name: "GIS and Mapping Specialist",
    description:
      "Add geospatial skills to your pilot certificate—the highest-demand combination in India's commercial drone market for 2D/3D survey-grade mapping.",
    lessons:
      "15–30 Days (Photogrammetry with Pix4D/Agisoft, LiDAR Data Processing, QGIS & ArcGIS)",
    certificate: "Yes (GIS & Mapping Specialist Certificate)",
    price: "₹30,000 - ₹45,000",
  },
  {
    level: "Level 03 — Advanced",
    name: "Agriculture Drone Specialist ( & Drone-Didi Program)",
    description:
      "Master precision agriculture—India's largest and fastest-growing drone application—covering crop health interpretation and automated farm spraying.",
    lessons:
      "5–10 Days (NDVI Mapping & Analysis, Precision Spraying Calibration, Nozzle Management & State Regulations)",
    certificate: "Yes (DGCA Agri Drone Specialist Certificate)",
    price: "₹20,000 - ₹35,000",
  },
  {
    level: "Level 04 — Expert",
    name: "DGCA Certified Flight Instructor",
    description:
      "Train the next generation of drone pilots at a DGCA-approved Remote Pilot Training Organisation (RPTO) with comprehensive instructor mastery.",
    lessons:
      "10–15 Days (Curriculum Development, Student Assessment, Simulator Instruction & RPTO Quality Management)",
    certificate: "Yes (DGCA Flight Instructor Approval)",
    price: "₹65,000",
  },
  {
    level: "Professional",
    name: "Site Inspection, Asset Mapping & Mining Analysis",
    description:
      "Specialized commercial training for infrastructure asset inspection and volumetric analysis of mining excavations using drone data.",
    lessons:
      "3–5 Days (3D Asset Inspection, Volumetric Calculations & Engineering GIS Analytics)",
    certificate: "Yes (Professional Inspection Certificate)",
    price: "₹35,000 - ₹45,000",
  },
  {
    level: "Technical & FPV",
    name: "Drone Assembly, Repair & FPV Flight Training",
    description:
      "Hands-on technical training in assembling and troubleshooting drone hardware systems alongside basic-to-advanced FPV racing maneuvers.",
    lessons:
      "3–5 Days (Hardware Assembly, Technical Troubleshooting, Basic & Competitive FPV Flying)",
    certificate: "Yes (Technical & FPV Completion Certificate)",
    price: "₹25,000 - ₹45,000",
  },
];

function TrainingSection() {
  return (
    <section id="courses" style={{ scrollMarginTop: 110 }}>
      <div
        style={{
          borderRadius: 15,
          padding: "15px 25px",
          marginBottom: 25,
          backgroundColor: "#064789",
          color: "#EBF2FA",
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Training & Courses</h2>
        <p style={{ margin: 0 }}>Hands-On Programs for Students & Engineers</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {coursesList.map((course, index) => (
          <div
            key={index}
            style={{
              borderRadius: 15,
              padding: 20,
              backgroundColor: "#4c7da0",
              color: "#EBF2FA",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 12,
              boxShadow: "5px 10px 10px 0px #ababab",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Level Badge */}
              <p
                style={{
                  borderRadius: 20,
                  padding: "4px 12px",
                  backgroundColor: "#064789",
                  color: "white",
                  fontSize: 12,
                  width: "fit-content",
                  margin: 0,
                }}
              >
                Level: {course.level}
              </p>

              {/* Course Name */}
              <h3 style={{ margin: 0 }}>{course.name}</h3>

              {/* Description */}
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
                {course.description}
              </p>
            </div>

            {/* Course Details: Lessons, Certificate, and Price */}
            <div
              style={{
                borderTop: "2px solid #EBF2FA",
                paddingTop: 10,
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontSize: 13,
              }}
            >
              <p style={{ margin: 0 }}>
                <b>Provided Lessons:</b> {course.lessons}
              </p>
              <p style={{ margin: 0 }}>
                <b>Certificate:</b> {course.certificate}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: 14 }}>Price:</span>
                <span
                  style={{
                    borderRadius: 20,
                    padding: "5px 13px",
                    backgroundColor: "#064789",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {course.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrainingSection;
