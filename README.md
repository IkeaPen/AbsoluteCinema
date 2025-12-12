# Absolute Cinema

## SPRENDŽIAMO UŽDAVINIO APRAŠYMAS

### SISTEMOS PASKIRTIS
Projekto tikslas - suteikti galimybę vartotojams pirkti bilietus į norimus kino seansus ir iš anksto išsirinkti sėdimą vietą.

Norint pilnai išnaudoti visas sistemos funkcijas, naudotojas turi turėti priregistruotą paskyrą ir būti prisijungęs. Prisijungęs naudotojas gali matyti visus kine rodomus filmus, jų seansus ir, paspaudus ant vieno iš seansų, matyti skirtingų bilietų kainas ir laisvas sėdimas vietas kino teatre. Galiausiai, išsirinkus bilieto tipą ir sėdimą vietą, naudotojas gali baigti savo bilieto pirkimą.
Neužsiregistravę naudotojai gali tik matyti rodomus filmus ir jų seansus, bet negali pasiekti bilietų ir sėdimų vietų pasirinkimo puslapio.
Administratoriai prižiūri puslapio tvarką – prideda/keičia/ištrina filmus, seansus ir bilietų tipus. Administratoriai taip pat gali atšaukti bilietų pirkimus ir ištrinti naudotojų paskyras.
<br></br>

###	FUNKCINIAI REIKALAVIMAI
####	Neprisijungusio naudotojo funkciniai reikalavimai:
*	Peržiūrėti kine rodomus filmus.
*	Peržiūrėti rodomų filmų seansus.
*	Užregistruoti paskyrą.
*	Prisijungti prie savo paskyros.

####	Prisijungusio naudotojo funkciniai reikalavimai:
*	Tas pats, kas aukščiau aprašyta.
*	Atsijungti nuo savo paskyros.
*	Peržiūrėti filmo seanso siūlomų bilietų tipus su kainomis.
*	Peržiūrėti filmo seanso sėdimas vietas.
*	Išsirinkti bilieto tipą.
*	Išsirinkti laisvą sėdimą vietą.
*	Nusipirkti bilietą.
*	Peržiūrėti savo nupirktus bilietus.

####	Administratoriaus funkciniai reikalavimai:
*	Tas pats, kas aukščiau aprašyta.
*	Matyti visus filmus, ne tik rodomus šiuo metu.
*	Pridėti filmus.
*	Pridėti filmų seansus.
*	Redaguoti filmą.
<br></br>

##	PASIRINKTŲ TECHNOLOGIJŲ APRAŠYMAS
Sistemos sudedamosios dalys: 
* Kliento pusė (angl. Front-End) – naudojamas React.js su Vite.
* Serverio pusė (angl. Back-End) – naudojamas Express.js, o duomenų bazei naudojamas PostgreSQL.
* Diegimo serveris (angl. Deployment) – naudojamas DigitalOcean ir Supabase.

Kliento pusė (angl. Front-End) ir serverio pusė (angl. Back-End) yra diegiamos tame pačiame DigitalOcean serveryje, o duomenų bazė – Supabase serveryje. Tam pavaizduoti yra sukurtas diegimo grafikas:

<img width="674" height="513" alt="image" src="https://github.com/user-attachments/assets/402178ef-c438-4f4d-90e5-32f105d03dfb" />


 
