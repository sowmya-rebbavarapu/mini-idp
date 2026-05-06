function Card({ title, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        cursor: "pointer",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h3>{title}</h3>
    </div>
  );
}

export default Card;