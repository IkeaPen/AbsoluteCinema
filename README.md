# Absolute Cinema

## SPRENDŽIAMO UŽDAVINIO APRAŠYMAS

### SISTEMOS PASKIRTIS
Projekto tikslas - suteikti galimybę vartotojams pirkti bilietus į norimus kino seansus ir iš anksto išsirinkti sėdimą vietą.

Norint pilnai išnaudoti visas sistemos funkcijas, naudotojas turi turėti priregistruotą paskyrą ir būti prisijungęs. Prisijungęs naudotojas gali matyti visus kine rodomus filmus, jų seansus ir, paspaudus ant vieno iš seansų, matyti skirtingų bilietų kainas ir laisvas sėdimas vietas kino teatre. Galiausiai, išsirinkus bilieto tipą ir sėdimą vietą, naudotojas gali baigti savo bilieto pirkimą.
Neužsiregistravę naudotojai gali tik matyti rodomus filmus ir jų seansus, bet negali pasiekti bilietų ir sėdimų vietų pasirinkimo puslapio.
Administratoriai prižiūri puslapio tvarką – prideda/keičia/ištrina filmus, seansus ir bilietų tipus. Administratoriai taip pat gali atšaukti bilietų pirkimus ir ištrinti naudotojų paskyras.
<br></br>

###	FUNKCINIAI REIKALAVIMAI
####	Neregistruoto naudotojo funkciniai reikalavimai:
* Peržiūrėti kine rodomus filmus.
* Peržiūrėti rodomų filmų seansus.
* Užregistruoti paskyrą.

####	Registruoto naudotojo funkciniai reikalavimai:
* Prisijungti prie savo paskyros.
* Atsijungti nuo savo paskyros.
* Peržiūrėti rodomus filmus.
* Peržiūrėti rodomų filmų seansus.
* Peržiūrėti filmo seanso siūlomų bilietų tipus su kainomis.
* Peržiūrėti filmo seanso sėdimas vietas.
* Išsirinkti bilieto tipą.
* Išsirinkti laisvą sėdimą vietą.
* Nusipirkti bilietą.
* Peržiūrėti savo nupirktus bilietus.

####	Administratoriaus funkciniai reikalavimai:
* Pridėti filmą, jo seansus ar bilietų tipus.
* Redaguoti filmą, jo seansus ar bilietų tipus.
* Ištrinti filmą, jo seansus ar bilietų tipus.
* Atšaukti naudotojų bilietus.
* Ištrinti naudotojų paskyras.
<br></br>

##	PASIRINKTŲ TECHNOLOGIJŲ APRAŠYMAS
Sistemos sudedamosios dalys: 
* Kliento pusė (angl. Front-End) – naudojamas React.js su Vite.
* Serverio pusė (angl. Back-End) – naudojamas Express.js, o duomenų bazei naudojamas PostgreSQL.
* Diegimo serveris (angl. Deployment) – naudojamas Render.

Visos dalys – kliento pusė (angl. Front-End), serverio pusė (angl. Back-End) ir duomenų bazė – yra diegiamos tame pačiame Render serveryje. Tam pavaizduoti yra sukurtas diegimo grafikas:

<img width="674" alt="image" src="https://github.com/user-attachments/assets/ac457047-796d-4dd8-ad8f-c63667d06a24" />

 
