const servicesList = [
  {
    name: "Aerial Photography & Videography",
    category: "Media & Events",
    description:
      "High-resolution 4K/8K stabilized aerial cinematography for commercial shoots, documentaries, and live event broadcasting.",
    deliverables: "RAW Footage + Edited Master",
    turnaround: "2-3 Days",
  },
  {
    name: "Multispectral Agricultural Surveying",
    category: "Agriculture",
    description:
      "NDVI crop health mapping, soil moisture analysis, and automated precision spraying across large farmland acres.",
    deliverables: "NDVI Health Map + Spray Log",
    turnaround: "150+ Acres / Day",
  },
  {
    name: "Thermal & Industrial Inspection",
    category: "Infrastructure",
    description:
      "Non-destructive radiometric thermal and optical inspection for solar plants, high-voltage power lines, and bridges.",
    deliverables: "Thermal Anomaly Report",
    turnaround: "48 Hours",
  },
  {
    name: "3D Photogrammetry & GIS Mapping",
    category: "Surveying",
    description:
      "Centimeter-level orthomosaic maps, digital elevation models (DEM), and volumetric stockpile measurements.",
    deliverables: "3D Point Cloud + Orthomosaic",
    turnaround: "3-5 Days",
  },
  {
    name: "Search & Rescue UAV Deployment",
    category: "Emergency Response",
    description:
      "Long-range weather-resistant hexacopters equipped with night-vision thermal payloads for disaster relief operations.",
    deliverables: "Live 10km Telemetry Feed",
    turnaround: "24/7 Rapid Dispatch",
  },
  {
    name: "Custom Autonomous Swarm Shows",
    category: "Entertainment",
    description:
      "Synchronized LED drone light formations and custom 3D sky animations for university fests and corporate launches.",
    deliverables: "3D Choreography + Flight Crew",
    turnaround: "Custom Booking",
  },
];

function ServiceSection() {
  return (
    <section id="services" style={{ scrollMarginTop: 110 }}>
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
        <h2 style={{ margin: 0 }}>Our Drone Services</h2>
        <p style={{ margin: 0 }}>Commercial & Industrial UAV Operations</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {servicesList.map((service, index) => (
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
              <p
                style={{
                  borderRadius: 20,
                  padding: "4px 12px",
                  backgroundColor: "#064789",
                  fontSize: 12,
                  width: "fit-content",
                  margin: 0,
                }}
              >
                {service.category}
              </p>
              <h3 style={{ margin: 0 }}>{service.name}</h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {service.description}
              </p>
            </div>

            <div
              style={{
                borderTop: "2px solid #EBF2FA",
                paddingTop: 10,
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                fontSize: 13,
              }}
            >
              <p style={{ margin: 0 }}>
                <b>Deliverables:</b> {service.deliverables}
              </p>
              <p style={{ margin: 0 }}>
                <b>Turnaround:</b> {service.turnaround}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceSection;
