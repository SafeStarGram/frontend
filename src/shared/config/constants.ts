export const departments = [
  { value: 1, text: "공사" },
  { value: 2, text: "공무" },
  { value: 3, text: "관리" },
  { value: 4, text: "보건" },
  { value: 5, text: "설비" },
  { value: 6, text: "안전" },
  { value: 7, text: "전기" },
  { value: 8, text: "품질" },
];

export const positions = [
  { value: 1, text: "부장" },
  { value: 2, text: "차장" },
  { value: 3, text: "과장" },
  { value: 4, text: "대리" },
  { value: 5, text: "주임" },
  { value: 6, text: "사원" },
];

export const findDepartment = (department: string | undefined) => {
  if (!department) return null;
  return departments.find((d) => d.value === Number(department))?.text;
};

export const findPosition = (position: string | undefined) => {
  if (!position) return null;
  return positions.find((d) => d.value === Number(position))?.text;
};
