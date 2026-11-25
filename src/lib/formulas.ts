export type Formula = {
  name: string;
  formula: string; // plain text with unicode symbols
  category:
    | "Algebra"
    | "Quadratic"
    | "Geometry"
    | "Coordinate Geometry"
    | "Mensuration"
    | "Trigonometry"
    | "Statistics & Probability"
    | "Arithmetic Progression";
};

// 30 important Class 10 board math formulas
export const mathFormulas: Formula[] = [
  // Algebra identities
  {
    name: "Square of Sum",
    formula: "(a + b)² = a² + b² + 2ab",
    category: "Algebra",
  },
  {
    name: "Square of Difference",
    formula: "(a − b)² = a² + b² − 2ab",
    category: "Algebra",
  },
  {
    name: "Difference of Squares",
    formula: "a² − b² = (a − b)(a + b)",
    category: "Algebra",
  },
  {
    name: "Cube of Sum",
    formula: "(a + b)³ = a³ + b³ + 3a²b + 3ab²",
    category: "Algebra",
  },
  {
    name: "Cube of Difference",
    formula: "(a − b)³ = a³ − b³ − 3a²b + 3ab²",
    category: "Algebra",
  },
  {
    name: "Sum of Cubes",
    formula: "a³ + b³ = (a + b)(a² − ab + b²)",
    category: "Algebra",
  },
  {
    name: "Difference of Cubes",
    formula: "a³ − b³ = (a − b)(a² + ab + b²)",
    category: "Algebra",
  },

  // Quadratic
  {
    name: "Quadratic Formula",
    formula: "x = ( −b ± √(b² − 4ac) ) / 2a",
    category: "Quadratic",
  },
  {
    name: "Discriminant",
    formula: "D = b² − 4ac",
    category: "Quadratic",
  },

  // Arithmetic Progression
  {
    name: "nth Term of an AP",
    formula: "aₙ = a + (n − 1)d",
    category: "Arithmetic Progression",
  },
  {
    name: "Sum of First n Terms of AP",
    formula: "Sₙ = (n / 2) · [ 2a + (n − 1)d ]",
    category: "Arithmetic Progression",
  },
  {
    name: "Sum of AP (last term form)",
    formula: "Sₙ = (n / 2) · (a + l)",
    category: "Arithmetic Progression",
  },

  // Coordinate geometry
  {
    name: "Distance Between Two Points",
    formula: "d = √( (x₂ − x₁)² + (y₂ − y₁)² )",
    category: "Coordinate Geometry",
  },
  {
    name: "Section Formula (Internal Division)",
    formula: "P = ( (m₁x₂ + m₂x₁)/(m₁ + m₂) , (m₁y₂ + m₂y₁)/(m₁ + m₂) )",
    category: "Coordinate Geometry",
  },
  {
    name: "Mid-point Formula",
    formula: "M = ( (x₁ + x₂)/2 , (y₁ + y₂)/2 )",
    category: "Coordinate Geometry",
  },
  {
    name: "Area of Triangle (Coordinate)",
    formula: "Area = ½ | x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂) |",
    category: "Coordinate Geometry",
  },

  // Geometry
  {
    name: "Pythagoras Theorem",
    formula: "Hypotenuse² = Perpendicular² + Base²   ⇒   H² = P² + B²",
    category: "Geometry",
  },
  {
    name: "Area of Triangle",
    formula: "Area = ½ × base × height",
    category: "Geometry",
  },
  {
    name: "Heron's Formula",
    formula: "Area = √( s(s − a)(s − b)(s − c) ),  s = (a + b + c) / 2",
    category: "Geometry",
  },

  // Mensuration — circles
  {
    name: "Area of Circle",
    formula: "A = πr²",
    category: "Mensuration",
  },
  {
    name: "Circumference of Circle",
    formula: "C = 2πr",
    category: "Mensuration",
  },
  {
    name: "Area of Sector",
    formula: "A = (θ / 360°) × πr²",
    category: "Mensuration",
  },
  {
    name: "Length of Arc",
    formula: "l = (θ / 360°) × 2πr",
    category: "Mensuration",
  },

  // Mensuration — solids
  {
    name: "Volume of Cylinder",
    formula: "V = πr²h",
    category: "Mensuration",
  },
  {
    name: "Curved Surface Area of Cylinder",
    formula: "CSA = 2πrh",
    category: "Mensuration",
  },
  {
    name: "Total Surface Area of Cylinder",
    formula: "TSA = 2πr(r + h)",
    category: "Mensuration",
  },
  {
    name: "Volume of Cone",
    formula: "V = (1/3) πr²h",
    category: "Mensuration",
  },
  {
    name: "Total Surface Area of Cone",
    formula: "TSA = πr(l + r)",
    category: "Mensuration",
  },
  {
    name: "Volume of Sphere",
    formula: "V = (4/3) πr³",
    category: "Mensuration",
  },
  {
    name: "Surface Area of Sphere",
    formula: "SA = 4πr²",
    category: "Mensuration",
  },
];

export const formulaCategories: Formula["category"][] = [
  "Algebra",
  "Quadratic",
  "Arithmetic Progression",
  "Coordinate Geometry",
  "Geometry",
  "Mensuration",
];
