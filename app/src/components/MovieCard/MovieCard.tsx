import { Card, Image, Text, Badge, Group, Button } from "@mantine/core";

export interface MovieCardProps{
    title: string;
    year: number;
    posterUrl: string;
    genre: string;
    onViewDetails?: ()=> void;
}


export const MovieCard = ({ title, year, posterUrl, genre, onViewDetails }: MovieCardProps) => {
    return (
        <Card shadow="sm" padding="lg" radius={"md"} withBorder w={300}>
            <Card.Section>
                <Image src={posterUrl} height={160} alt={title}/>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{title}</Text>
                <Badge color="pink">{genre}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                Estreno: {year}
            </Text>

            <Button fullWidth mt="md" radius="md" onClick={onViewDetails}>
                Ver detalles
            </Button>
        </Card>
    )
}