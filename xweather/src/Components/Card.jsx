
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Cards({ title, value }) {

    return (
        <Card className='weather-card' sx={{ height: '100px', width: '100px' }} variant="outlined">
            < p > {title}</p >
            <p>{value}</p>
        </Card >
    )
}