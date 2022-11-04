import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import React from 'react';

interface CardProps {
  title: any;
  subtitle?: string;
  minWidth?: number;
  titleColor?: string;
  children?: any;
}

export const SimpleCard: React.FC<CardProps> = ({
  title,
  subtitle = undefined,
  minWidth = 250,
  titleColor = 'black',
  children = undefined,
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
        subheader={
          subtitle && <Typography fontSize={12}>{subtitle}</Typography>
        }
      />
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
};
