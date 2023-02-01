import { Card, CardContent, Skeleton } from '@mui/material';


const CatalogCardSkeleton = () => {
  return (
    <Card sx={{ width: 320 }}>
      <CardContent>
        <Skeleton variant="rectangular" height={120} sx={{ marginBottom: 2 }} />
        <Skeleton />
        <Skeleton width="60%" />
        <Skeleton height={60} />
      </CardContent>
    </Card>
  );
}

export default CatalogCardSkeleton;