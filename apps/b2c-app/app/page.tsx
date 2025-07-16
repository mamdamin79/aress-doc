import { Button, Pagination } from 'design-system';

export default function Index() {
  return (
    <div className="w-fit mx-auto mt-20 bg-surface-brand-600">
      welcome to b2c app
      <Button align="center" isLoading={false} mode="primary" theme="brand" size="md" iconLeft={{name: 'layout-grid', size: 'md'}} iconRight={{name: 'copy'}} >welcome to B2C app</Button>
      <Pagination currentPage={1} pageCount={5} pageSize={10} totalItems={5} />
   </div>
  );
}
