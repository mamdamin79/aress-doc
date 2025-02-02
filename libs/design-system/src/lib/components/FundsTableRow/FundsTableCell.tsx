interface Props {
  content: string;
}
export function TableCell({ content }: Props) {
  return <td className="w-32   py-5">{content}</td>;
}
