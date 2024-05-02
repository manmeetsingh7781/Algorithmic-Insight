// takes a string of name and returns the initials
export function generateInitials(name) {
  if (!name) return "X";
  const name_parts = name.split(" ");
  if (name_parts.length === 1) {
    return name_parts[0][0].toUpperCase();
  } else {
    return (name_parts[0][0] + "" + name_parts[1][0]).toUpperCase();
  }
}
