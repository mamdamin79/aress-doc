import { BreadcrumbItem } from './Breadcrumb.types';

interface Props {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: Props) {
  return (
    <div dir="rtl" className={`flex items-center gap-4`}>
      {items.map((item: BreadcrumbItem, index: number) => (
        <div
          className={`hover:text-[#545962] font-semibold flex items-center ${
            index + 1 === items.length ? 'text-[#05070C]' : 'text-[#72777E]'
          }`}
          key={item.title}
        >
          <a className="flex items-center" href={item.link ?? '/'}>
            {/* <img src="" alt="" /> */}
            <p>I</p>
            <p className="text-xs mr-0.5 ml-2">{item.title}</p>
            {index + 1 !== items.length && <span>{'>'}</span>}
          </a>
        </div>
      ))}
    </div>
  );
}
