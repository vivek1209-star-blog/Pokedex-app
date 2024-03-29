import React, { useEffect, useState } from 'react'

import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { IMAGE_URL, toFirstCharUppercase } from '../Config/Index';
import Api from '../Services/Api';

export const PokemonCard = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);



    const pokemonData = async () => {

        try {
            const res = await Api.get(`pokemon/${pokemonId}/`)
            console.log('res', res)
            const { data } = res;
            setPokemon(data);
        } catch (error) {
            console.log('error ==>', error)

        }
    }


    useEffect(() => {
        pokemonData();
    }, [pokemonId]);


    const generatePokemonJSX = (pokemon) => {
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = `${IMAGE_URL}/${id}.png`;
        const { front_default } = sprites;
        return (
            <>

                <Typography variant="h1" >
                    {`${id}.`} {toFirstCharUppercase(name)}
                    <img src={front_default} />
                </Typography>
                <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
                <Typography variant="h3">Pokemon Info</Typography>
                <Typography>
                    {"Species: "}
                    <Link href={species.url}>{species.name} </Link>
                </Typography>
                <Typography>Height: {height} </Typography>
                <Typography>Weight: {weight} </Typography>
                <Typography variant="h6"> Types:</Typography>
                {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography key={name}> {`${name}`}</Typography>;
                })}
            </>
        );
    };

    return (
        <>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
            {pokemon === false && <Typography> Pokemon not found</Typography>}

            {pokemon !== undefined && (
                <Button variant="contained" onClick={() => history.push("/")}>
                    back to pokedex
                </Button>
            )}
        </>
    );
};

