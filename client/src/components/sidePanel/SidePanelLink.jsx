export default function SidePanelLink({ sizingGroup, category }) {
  const ref =
    "/" +
    sizingGroup.split("-")[1] +
    "/" +
    sizingGroup.split("-")[0] +
    "/" +
    category;
  return (
    <a data-category={category} href={ref}>
      {(category.charAt(0).toUpperCase() + category.slice(1)).replace("-", " ")}
    </a>
  );
}
