import { ReportCard } from 'design-system';
import React from 'react';
import chartPNG from '@aress-assets/chart.png';
import chartPNG2 from '@aress-assets/chart2.png';

export const ReportList: React.FC = ({ reports }: any) => {
  return (
    <div className="flex flex-wrap gap-8">
      {reports.map((report,idx) => (
        <ReportCard
          key={report.title}
          {...report}
          fixedBrief={true}
          image={idx % 2 === 0 ? chartPNG : chartPNG2}
          categoryType={report.category}
          isLiked={true}
          reportSubscription={report.category}
        />
      ))}
    </div>
  );
};
