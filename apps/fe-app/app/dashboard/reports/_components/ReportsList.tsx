import { GetDashboardReportsResponse } from 'apps/fe-app/app/openapi/requests';
import { ReportCard } from 'design-system';
import React from 'react';

type Props = {
  reports: GetDashboardReportsResponse;
}

export const ReportList: React.FC<Props> = ({ reports }) => {
  
  return (
    <div className="flex flex-wrap gap-8">
      {reports.map((report,idx) => (
        <ReportCard
          key={report.identifier}
          {...report}
          fixedBrief={true}
          image={report.image}
          categoryType={report.category.title}
          isLiked={report.userFavorite}
          reportSubscription={report.category.title}
          brief={report.summary}
          title={report.title}
          newBadge={report.isNew}
          videoBadge={report.video}
        />
      ))}
    </div>
  );
};
