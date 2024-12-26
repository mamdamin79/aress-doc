export const SectionItem = ({
  title,
  paragraphs,
  list,
}: {
  title: string;
  paragraphs?: string[];
  list?: { subtitle: string; content: string }[];
}) => (
  <li className="mb-8">
    <h4 className="mb-4 text-2xl font-medium">{title}</h4>
    {paragraphs &&
      paragraphs.map((paragraph, index) => (
        <p key={index} className="text-md mb-4 leading-relaxed">
          {paragraph}
        </p>
      ))}
    {list && (
      <ol className="list-decimal pr-2.5 text-right leading-relaxed">
        {list.map((item, index) => (
          <li key={index} className="mb-4">
            <span className="mb-1 font-medium">{item.subtitle}</span>
            <p className="text-md">{item.content}</p>
          </li>
        ))}
      </ol>
    )}
  </li>
);
