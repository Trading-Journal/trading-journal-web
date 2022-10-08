import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import React from 'react';

interface CardProps {
  title: any;
  subtitle: string;
  minWidth?: number;
  titleColor?: string;
}

export const SimpleCard: React.FC<CardProps> = ({
  title,
  subtitle,
  minWidth = 250,
  titleColor = 'black',
}) => {
  return (
    <Card sx={{ minWidth: minWidth }} variant="outlined">
      <CardHeader
        sx={{ textAlign: 'center' }}
        title={
          <Typography color={titleColor} fontSize={20}>
            {title}
          </Typography>
        }
        subheader={<Typography fontSize={12}>{subtitle}</Typography>}
      />
    </Card>
  );
};
