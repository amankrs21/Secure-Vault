import Grid from '@mui/material/Grid2';
import {
    Container, Typography, List, ListItem, Divider, Button, Card, CardContent
} from '@mui/material';

export default function Connect() {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h2" textAlign="center" mt={5}>
                Meet the Developer 🧑‍💻
            </Typography>

            <Typography variant="h6" textAlign="center" my={1}>
                I&apos;m a DevOps Engineer at Tata Consultancy Services with expertise in a wide range of technologies.
                My experience spans full-stack development, DevOps, and AI-based solutions.
            </Typography>

            <Divider />

            <Grid container spacing={2} mt={4}>
                <Grid size={{ xs: 12, md: 6 }} pl={2}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" textAlign="center">
                                Technologies I&apos;ve Worked With
                            </Typography>
                            <List>
                                <ListItem>Python, Java, Dotnet, Node.js</ListItem>
                                <ListItem>Django, Flask, Spring Boot, React, Angular</ListItem>
                                <ListItem>JWT Authentication, PostgreSQL, MongoDB</ListItem>
                                <ListItem>Gen AI Technologies: Mistral 7B, ChromaDB, All-MiniLM-L6-V2</ListItem>
                                <ListItem>CI/CD, Cloud Platforms, and Automation Tools</ListItem>
                                <ListItem>Currently exploring Machine Learning, Deep Learning, and NLP</ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} pl={2}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" textAlign="center">
                                Let&apos;s Collaborate!
                            </Typography>
                            <List>
                                <ListItem>
                                    I&apos;m always excited to explore new opportunities and collaborations. Feel free to reach out for any project ideas or inquiries.
                                </ListItem>
                                <ListItem>
                                    Whether it&apos;s freelance work, consulting, or full-time opportunities, let&apos;s connect and explore how we can work together.
                                </ListItem>
                                <ListItem>
                                    You can contact me via email or visit my portfolio website to learn more about me.
                                </ListItem>

                                <div style={{ textAlign: 'center' }}>
                                    <Button variant="contained" onClick={() => window.location.href = "mailto:amansingh844123@gmail.com"}>
                                        Send me an Email 📧
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="contained" href="https://amankrs21.pages.dev" target="_blank" rel="noopener noreferrer">
                                        Visit My Portfolio 🌐
                                    </Button>
                                </div>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Typography variant="h6" textAlign="center" my={4}>
                Thanks for visiting my website. I hope you found it helpful. Have a great day! 😊
            </Typography>
        </Container>
    );
}
