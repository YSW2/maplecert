const getUnionUrl = (union_grade) => {
  switch (union_grade) {
    case "노비스 유니온 1":
      return "novice-union-1.png";
    case "노비스 유니온 2":
      return "novice-union-2.png";
    case "노비스 유니온 3":
      return "novice-union-3.png";
    case "노비스 유니온 4":
      return "novice-union-4.png";
    case "노비스 유니온 5":
      return "novice-union-5.png";
    case "베테랑 유니온 1":
      return "veteran-union-1.webp";
    case "베테랑 유니온 2":
      return "veteran-union-2.webp";
    case "베테랑 유니온 3":
      return "veteran-union-3.webp";
    case "베테랑 유니온 4":
      return "veteran-union-4.webp";
    case "베테랑 유니온 5":
      return "veteran-union-5.webp";
    case "마스터 유니온 1":
      return "master-union-1.webp";
    case "마스터 유니온 2":
      return "master-union-2.webp";
    case "마스터 유니온 3":
      return "master-union-3.webp";
    case "마스터 유니온 4":
      return "master-union-4.webp";
    case "마스터 유니온 5":
      return "master-union-5.webp";
    case "그랜드 마스터 유니온 1":
      return "grand-master-union-1.webp";
    case "그랜드 마스터 유니온 2":
      return "grand-master-union-2.webp";
    case "그랜드 마스터 유니온 3":
      return "grand-master-union-3.webp";
    case "그랜드 마스터 유니온 4":
      return "grand-master-union-4.webp";
    case "그랜드 마스터 유니온 5":
      return "grand-master-union-5.webp";
    case "슈프림 유니온 1":
      return "supreme-union-1.webp";
    case "슈프림 유니온 2":
      return "supreme-union-2.webp";
    case "슈프림 유니온 3":
      return "supreme-union-3.webp";
    case "슈프림 유니온 4":
      return "supreme-union-4.webp";
    case "슈프림 유니온 5":
      return "supreme-union-5.webp";
    default:
      return "novice-union-1.png";
  }
};
export default getUnionUrl;
