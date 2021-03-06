import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../stylesheets/Student.css';
import '../../stylesheets/Insertion.css';
import '../../stylesheets/App.css'
import CarouselNews from '../../components/CarouselNews';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import { Grid, Button, Typography } from '@mui/material'

// Unique key
import uuid from 'react-uuid'

// Components
import CardEvents from '../../components/CardEvents'
import SportCard from '../../components/SportCard'
import Calendar from '../../components/Calendar'
import { AdultTabs } from '../../components/Tabs'

const Insertion = (props) => {

    const [events, setEvents] = useState([]);
    const [eventsDay, setEventsDay] = useState([]);
    const [clicked, setClicked] = useState(false);

    const dateFormat = function (d) {
        var newDate = new Date(d);
        var format = newDate.getDate() + '/' + (newDate.getMonth() + 1) + "/" + newDate.getFullYear()
        return format
    }

    const dateToday = new Date()
    const dateTodayFormat = dateFormat(dateToday)

    useEffect(() => {

        const fetchEvents = async () => {
            const res = await fetch('/event/see-events/insertion');
            const insertionEvents = await res.json();
            await setEvents(insertionEvents.events);
        }
        fetchEvents()

        const todayEvents = () => {
            const eventsTodayFilter = events.filter(event => {
                const eventDay = dateFormat(event.date)
                return dateTodayFormat == eventDay
            })

            if (eventsTodayFilter.length !== 0) {
                setEventsDay(eventsTodayFilter)
            }
        }
        todayEvents()

        setClicked(false);
    }, [])

    const eventsData = eventsDay.map(({ title, description, type, date, maxNumberOfPeople }) => {

        return (<CardEvents
            key={uuid()}
            title={title}
            desc={description}
            img={`${type.replace(/\s|'/g, '-').replace(/??|??/g, 'e').replace(/??|??/g, "a")}.jpg`}
            date={date}
            maxPeople={maxNumberOfPeople}
        />)
    })

    const SportInclusion = [
        {
            id: "inclusport", img: "../images/insertion/inclusport.jpg", imgDesc: "programme-inclusport",
            title: "Inclu'Sport",
            content: "Une initiative visant ?? accompagner les r??fugi??s et migrants licenci??s au club en valorisant leur parcours"
        },
        {
            id: "accompagnement-tutore", img: "../images/insertion/accompagnement-tutore.jpg", imgDesc: "accompagnement-tutor??",
            title: "Accompagnement tutor??",
            content: "Un programme assur?? par un adulte du club pour tous les jeunes susceptibles d?????voluer vers un r??le d???encadrant"
        },
        {
            id: "sport-et-emploi", img: "../images/insertion/sport-et-emploi.jpg", imgDesc: "sport-et-emploi",
            title: "Sport & Emploi",
            content: "Un ensemble d'actions pour ramener les jeunes les plus en difficult?? vers un cadre plus sain, via le sport et le lien social"
        },
    ]
    const nav = ["Actualites", "Evenements", "Programme", "Football", "Taekwondo", "Contact"]

    const sendArticleToStore = async (title) => {
        const res = await fetch(`/article/send-article-to-store/${title}`);
        const article = await res.json();
        props.onChooseArticle(article.article);
        setClicked(true);
    }

    if (props.article && clicked) {
        return (
            <Redirect to='/article' />
        )
    } else {
        return (
            <>
                <Navbar nav={nav} />
                {/* <div className='Student' 
            // style={myStyle.studentContainer} 
            id="Accueil"> */}
                <div className='section' id={nav[0]}>
                    <div className='opacity'>
                        <Typography variant='h3'>Actualit??s</Typography>
                        <CarouselNews news={[
                            {
                                img: '/images/insertion/jeux-de-l-emploi.jpg',
                                title: "JE 2024 : Les Jeux de l'Emploi !",
                                subtitle: "Un ??v??nement festif, sportif et citoyen, qui promeut la pratique du sport comme vectrice d???insertion sociale. A retrouver samedi au Gymnase de la Goutte d'Or !"
                            },
                            {
                                img: '/images/insertion/temoignage-adama.jpg',
                                title: "Vivre sa vie en musique...",
                                subtitle: `Adama, jeune de la Goutte d'Or, t??moigne sur son parcours de trompettiste dans "La r??ussite est un long parcours", nouveau documentaire de Val??rie Potonni??e.`
                            }]} />
                    </div>
                </div>

                <div div className='section2' id={nav[1]}>
                    <div className='opacity'>
                        <Grid container display='flex' justifyContent='center' py={4}>
                            <Typography variant='h3'>Prochains ??v??nements</Typography>
                        </Grid>
                        <Grid container justifyContent="center" style={{ paddingBottom: '2rem' }}>
                            <Grid item xs={10} sm={12} md={4}>
                                <Calendar events={events} setEvents={setEvents} eventsDay={eventsDay} setEventsDay={setEventsDay} />
                            </Grid>
                            <Grid item xs={12} style={{ margin: '1rem' }}>{eventsDay.length > 0 && <h2 style={{ textAlign: 'center', color: "dark" }}> {eventsDay.length} {eventsDay.length > 1 ? 'Activit??s disponibles' : 'Activit?? disponible'}</h2>}</Grid>
                            {eventsData}
                        </Grid>
                    </div>
                </div>

                <div div className='section' id={nav[2]}>
                    <div className='opacity'>

                        <Grid container xs={12}
                            minHeight='100vh' justifyContent='center' className='sport-inclusion'
                        >
                            <Grid item xs={12} mt={5}>
                                <Typography py={4} variant='h3'>
                                    Nos programmes Sport & Insertion
                                </Typography>
                            </Grid>
                            {SportInclusion.map((card, index) => {
                                return (
                                    <Grid key={index} height='300px' item xs={11} md={3.5} className={`${card.id}-info-container`} style={{ margin: ' 1rem ' }}>
                                        <div className="adult-sports-name">
                                            <h1 style={{ color: "white", fontSize: 45, textShadow: "black 2px 3px", textWrap: "wrap" }}>{card.title}</h1>
                                        </div>
                                        <div className="adult-sports-text">
                                            <p style={{ marginBottom: 25 }}>{card.content}</p>
                                            <Button variant="contained"
                                                // style={{ backgroundColor: '#003D55', width: '180px', alignSelf: 'center', borderRadius: 15 }} 
                                                onClick={() => sendArticleToStore(card.title)}>En savoir plus</Button>
                                        </div>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>
                </div>

                <div div className='section2' id={nav[3]}>
                    <div className='opacity'>
                        <Grid container xs={12} height='100vh' className='football'>
                            <Grid item xs={11} md={8} className="football-info-container">
                                <div className="sports-name">
                                    <h1 style={{ color: "white", fontSize: 75, textShadow: "black 2px 3px" }}>Football</h1>
                                </div>
                                <div className="sports-text">
                                    <p style={{ marginBottom: 25 }}>Alliant l'??ducatif au sportif, le club de foot d'EGDO est anim?? avec passion par des coachs du quartier. Il comporte des ??quipes pour tous les ??ges.</p>
                                    <Button variant="contained" style={{ backgroundColor: '#003D55', width: '180px', alignSelf: 'center', borderRadius: 15 }}>Je m'inscris</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div div className='section'>
                    <div className='opacity'>
                        <div className='football-info'>
                            <Typography variant='h3' style={{ textAlign: "center", padding: "1.5rem 0 1.5rem 0" }}>Les entra??nements</Typography>
                            <AdultTabs />
                        </div>
                    </div>
                </div>

                <div div className='section2' id={nav[4]}>
                    <div className='opacity'>
                        <Grid container xs={12} className='taekwondo'>
                            <Grid item xs={11} md={5} height='500px' className="taekwondo-info-container" style={{ margin: '2rem' }}>
                                <div className="sports-name">
                                    <h1 style={{ color: "#4c83bc", fontSize: 75, textShadow: "white 2px 3px" }}>Taekwondo</h1>
                                </div>
                                <div className="sports-text">
                                    <p style={{ marginBottom: 25 }}>Au sein d'EGDO, on pratique un art martial olympique depuis un quart de si??cle ! Le taekwondo est propos?? en mixte dans la salle Cap-Dadi du gymnase de la Goutte d???Or.</p>
                                    <a href="/student/files/inscription-tkw.pdf" download style={{ textDecoration: 'none', alignSelf: 'center' }}> <Button variant="contained" style={{ backgroundColor: '#003D55', width: '180px', alignSelf: 'center', borderRadius: 15 }}>Je m'inscris</Button></a>
                                </div>
                            </Grid>


                            <Grid item xs={11} md={5} className="bodytae-info-container" height='500px' style={{ margin: '2rem' }} >
                                <div className="sports-name">
                                    <h1 style={{ color: "white", fontSize: 75, textShadow: "black 2px 3px" }}>Body Tae F??minin</h1>
                                </div>
                                <div className="sports-text">
                                    <p style={{ marginBottom: 25 }}>Le Body Taekwondo f??minin est un m??lange de fitness et de taekwondo en musique qui d??veloppe la coordination, la psychomotricit?? et la perception du corps dans l'espace.</p>
                                    <a href="/student/files/inscription-tkw-f.pdf" download style={{ textDecoration: 'none', alignSelf: 'center' }}> <Button variant="contained" style={{ backgroundColor: '#003D55', width: '180px', alignSelf: 'center', borderRadius: 15 }}>Je m'inscris</Button></a>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div className='section'>
                    <div className='opacity'>
                        <div className='football-info'>

                            <Typography variant='h3' pt={3}>Les entra??nements</Typography>
                            <Grid container xs={12} justifyContent="center" >

                                <SportCard
                                    terrain="Gymnase de la Goutte d'Or"
                                    adress='12 rue de la Goutte d???Or'
                                    city='75018 Paris'
                                    img='u16tkw'
                                    category={[{ gen: "Taekwondo", cat: '17 ans et +', trainingDays: [{ day: 'Mardi', hour: 'de 19h30 ?? 20h30' }, { day: 'Samedi', hour: 'de 15h45 ?? 17h' }] }]}
                                    coaches={[]}
                                    sport='tkw'
                                />

                                <SportCard
                                    terrain="Gymnase de la Goutte d'Or"
                                    adress='12 rue de la Goutte d???Or'
                                    city='75018 Paris'
                                    img='tkwu12'
                                    category={[{ gen: "Body Tae F??minin", cat: '15 ans et +', trainingDays: [{ day: 'Mardi', hour: 'de 20h30 ?? 21h30' }, { day: 'Samedi', hour: 'de 13h ?? 14h' }] }]}
                                    coaches={[]}
                                    sport='tkw'
                                />
                            </Grid>
                        </div>
                    </div >
                </div >

                <div id={nav[5]}>
                    <Footer />
                </div>
            </>
        )
    }
}

const myStyle = {
    upcomingEvents: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%'
    }
}

function mapStateToProps(state) {
    return { article: state.article }
}

function mapDispatchToProps(dispatch) {
    return {
        onChooseArticle: function (article) {
            dispatch({ type: 'chooseArticle', article })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Insertion);