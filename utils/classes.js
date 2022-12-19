const classes = {
  section: {
    marginTop: 1,
    marginBottom: 1,
    justifyContent: "center",
  },
  smallText: {
    fontSize: "13px",
  },
  main: {
    marginTop: 0,
  },
  footer: {
    paddingRight: "50px",
    marginLeft: "50px",
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
  appbar: {
    backgroundColor: "#ffffff",
    "& a": {
      color: "#000000",
      marginLeft: 1,
    },
  },
  toolbar: {
    justifyContent: "space-between",
    width: "100%",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  navbarButton: {
    fontFamily: "helvetica",
    color: "#000000",
    fontWeight: "bold",
  },
  fullWidth: {
    width: "100%",
  },
  sort: {
    marginRight: 1,
  },
  visible: {
    display: "initial",
  },
  hidden: {
    display: "none",
  },
  // search

  searchForm: {
    border: "1px solid #ffffff",
    backgroundColor: "#ffffff",
    borderRadius: 1,
  },
  imagec: {
    minWidth: "670px",
    height: "670px",
  },
  searchInput: {
    paddingLeft: 1,
    color: "#000000",
    "& ::placeholder": {
      color: "#606060",
    },
  },
  n: {},
  searchButton: {
    padding: 1,
    borderRadius: "0 0px 0px 0",
    "& span": {
      color: "black",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "2.5rem",
    paddingBottom: "0",
  },
  titleMobile: {
    fontWeight: "bold",
    fontSize: "3rem",
    fontFamily: " coolvetica, sans-serif",
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
    fontSize: "2.2rem",
    fontFamily: " Helvetica, ",
    fontWeight: "700",
  },
  line: {
    border: "1px solid white",
    borderTop: "1px solid black",
    height: "2px",
    opacity: "1",
    width: "97%",
  },
  but: {
    backgroundColor: "white",
    padding: "6px 12px",
    border: "2px solid black",
    fontFamily: " helvetica, sans-serif",
    fontSize: "12px",
    borderRadius: "0 ",
    borderWidth: ".1",

    "&:hover": {
      transform: "scale(1.1, 1.1)",
    },
  },
  blackline: {
    borderBottomStyle: "solid",
    fontWeight: "bold",
    textDecoration: "underline ",
    borderWidth: "1",
    textDecorationThickness: "1.5px",
    fontWeight: "bold",
    fontFamily: " coolvetica, sans-serif",

    "&:hover": {
      transform: "scale(1.1, 1.1)",
      backgroundColor: "transparent",
      textDecoration: "underline ",
      borderWidth: "1",
      textDecorationThickness: "1.5px",
    },
  },
  radius: { borderRadius: "100px" },
  buttonQ: { width: "80px", borderWidth: "1px", borderColor: "black" },
  buttonGroup: {
    fontWeight: "bold",
    fontFamily: " coolvetica, sans-serif",
    borderRadius: "0 ",
    borderWidth: "1px",
    borderColor: "black",
  },
  productosIndex: {
    height: "30px",
    width: "100%vw",
    background: "#f1f1f1",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  imageP: {
    filter: " drop-shadow(-2px 26px 18px rgba(0, 0, 0, 0.6));",
    zIndex: "0",
  },
  card: {
    cursor: "pointer",
    transform: "scale(1, 1)",
    transition: "transform 0.5s ease",
    color: "black",
    "&:hover": {
      transform: "scale(1.1, 1.1)",
    },
  },
  catBut: {
    "&:hover": {
      transform: "scale(1.1, 1.1)",
      backgroundColor: "transparent",
      textDecoration: "underline ",
      borderWidth: "2",
      textDecorationThickness: "1.5px",
    },
  },
  visibleI: {
    display: "initial",
  },
  buyNow: {
    backgroundColor: "black",
    color: "white",
    border: "1.5px solid black",
    borderRadius: "0",
    fontWeight: "bold",
    fontFamily: " helvetica, sans-serif",
    textTransform: "none",

    "&:hover": {
      transform: "scale(1.1, 1.1)",
      backgroundColor: "black",
      color: "white",
    },
  },
  selected: {
    backgroundColor: "Black",
    color: "white",
    padding: "6px 12px",
    border: "2px solid black",
    fontFamily: " helvetica, sans-serif",
    fontSize: "12px",
    borderRadius: "0 ",
    borderWidth: ".1",

    "&:hover": {
      transform: "scale(1.1, 1.1)",
    },
  },
  productsIndexBox: {
    justifyContent: "center",
    paddingTop: "0px",
    alignItems: "center",
    paddingBottom: "50px",
  },
  typo: {
    fontWeight: "bold",
    fontFamily: " helvetica, sans-serif",
    color: "white",
  },
  productIndex: {
    fontWeight: "700",
    fontFamily: " helvetica, sans-serif",
    textTransform: "none",
    fontSize: "1.3rem",
  },
  productIndexTitle: {
    fontWeight: "700",
    fontFamily: " helvetica, sans-serif",
    textTransform: "none",
    fontSize: "2rem",
  },
};

export default classes;
