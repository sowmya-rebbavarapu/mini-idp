function Card({ title, onClick }) {

  return (

    <div
      onClick={onClick}

      style={{

        padding: "30px",

        borderRadius: "16px",

        cursor: "pointer",

        textAlign: "center",

        background: "white",

        boxShadow:
          "0 4px 15px rgba(0,0,0,0.15)",

        transition: "0.3s",

        minHeight: "120px",

        display: "flex",

        justifyContent: "center",

        alignItems: "center"
      }}

      onMouseEnter={(e) =>
        e.currentTarget.style.transform =
          "translateY(-5px)"
      }

      onMouseLeave={(e) =>
        e.currentTarget.style.transform =
          "translateY(0px)"
      }
    >

      <h3
        style={{
          margin: 0,
          color: "#111827",
          fontSize: "22px",
          fontWeight: "bold"
        }}
      >
        {title}
      </h3>

    </div>
  );
}

export default Card;