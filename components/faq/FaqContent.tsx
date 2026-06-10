import Image from "next/image";
import { FaqList, FaqNote, FaqQa, FaqSection, FaqSubheading } from "@/components/faq/FaqSection";

export default function FaqContent() {
  return (
    <div>
      <FaqSection id="nepravilno-koriscenje-naocara" title="Nepravilno korišćenje naočara">
        <p>
          U ovom video snimku su prikazani najčešći problemi sa naočarima, koji nastaju usled{" "}
          <strong className="text-neutral-950">nepravilnog korišćenja naočara</strong>:
        </p>
        <a
          href="https://youtu.be/GM3DdlmwJjI?si=sW5BuEXFflU1r1_4"
          target="_blank"
          rel="noreferrer"
          className="inline-flex text-accent underline-offset-4 transition-colors hover:text-neutral-950 hover:underline"
        >
          Pogledajte video na YouTube-u
        </a>
        <FaqSubheading>Najčešći uzroci oštećenja</FaqSubheading>
        <FaqList
          items={[
            "Skidanje naočara jednom rukom, razvlačenje van granica mehanizma flex drškice (koji nam daje veću udobnost naočara) kada dolazi do pucanja federa i najčešće se naočare teško popravljaju na tom mestu.",
            "Nepravilno odlaganje naočara na čvrstu podlogu koja oštećuje površinu plastičnih stakala (kakvu god zaštitu da ona imaju).",
            "Brisanje plastičnih stakala neodgovarajućim tkaninama.",
            "Korišćenje određenih tečnosti koje mogu biti abrazivne ili sa većim procentom alkohola, tokom farbanja kose.",
            "Korišćenje vlažnih maramica sa alkoholom.",
            "Izlaganje naočara velikoj toploti duže od 30 minuta (držanje u autu tokom vrućina ili pored drugog izvora toplote, poput rerne, fena tokom sušenja kose i sl.).",
          ]}
        />
        <FaqSubheading>Naočare održavajte</FaqSubheading>
        <FaqList
          items={[
            "Namenskim krpicama od finog mikrofibera.",
            "Tečnostima za čišćenje stakala bez mnogo alkohola.",
            "Brisanje stakala pamučnom pelenom daje odlične rezultate u kombinaciji sa namenskim tečnostima.",
            "Odlaganjem naočara u zaštitnu futrolu.",
            "Naočare skidajte sa dve ruke, kada god možete ili sa jednom ali pažljivo i polako.",
          ]}
        />
        <FaqNote variant="warning">Posetite vašeg optičara za dodatne savete i preporuke!</FaqNote>
      </FaqSection>

      <FaqSection id="kratkovidost-myopia" title="Kratkovidost — myopia" image="/images/faq/kratkovidost.png" imageAlt="Kratkovidost - myopia">
        <p>
          <strong className="text-neutral-950">Kratkovidost ili myopia</strong> je refrakciona mana koja nastaje najčešće usled duže
          očne jabučice (duže od 24 mm) pa se svetlosni zraci prelamaju pre žute mrlje, tj. tačke najjasnijeg vida na
          mrežnjači.
        </p>
        <p>
          Koriguje se rasipnim, minus (−) staklima ili kontaktnim sočivima, koja omogućavaju pravilno prelamanje svetlosti.
          Kratkovidost je uglavnom nasledna anomalija. Postoje vrlo uspešne metode skidanja dioptrije operativnim putem.
        </p>
        <FaqSubheading>Česta pitanja o kratkovidosti</FaqSubheading>
        <div className="space-y-4">
          <FaqQa
            question="Kratkovidost mi se javila u 34 godini života, jer sam mnogo čitala i koristila oči? Da li je ovo tačno?"
            answer="Ovo nije tačno. Kratkovidost najčešće nastaje između 10 i 14 god života, često i ranije. Do 34 godine vam nije mnogo smetala, pa je niste ranije primetili. I dalje možete da čitate koliko hoćete ali će vam mnogo lakše biti uz naočare."
          />
          <FaqQa
            question="Stalno mi raste kratkovidost. Sa 15 godina sam imala −1.00 a sada sa 24 g imam −4.00. Dokle će rasti i može li se zaustaviti?"
            answer="Ne postoji mogućnost da se rast dioptrije zaustavi, osim posebnom vrstom dioptrijskih stakala MyoCare, MyoStop, MyoControl, Stellest i ostali. Myopia raste do 27 god života ± koja godina više-manje."
          />
          <FaqQa
            question="Nošenjem kontaktnih sočiva se usporava ili čak zaustavlja rast kratkovidosti?"
            answer="Ovo je delimično tačno. Činjenica da su kontaktna sočiva (uz obavezno nošenje naočara) najbolje rešenje za miopije preko −3.00 d."
          />
          <FaqQa
            question="Povišen očni pritisak GLAUKOM — da li je opasniji i češći kod kratkovidih?"
            answer="Glaukom je podmukla bolest oka i češće se pojavljuje kod kratkovidih. Zato je neophodno meriti očni pritisak na pregledu kod oftalmologa, bar jednom u dve godine."
          />
          <FaqQa
            question="Moraju li kratkovidi da nose naočare stalno?"
            answer="Deca moraju, da bi im se vid razvio kako treba. Odrasli bi trebalo da nose stalno ukoliko je miopija preko −1.00 D ili u kombinaciji sa astigmatizmom."
          />
        </div>
      </FaqSection>

      <FaqSection id="naocare-za-rad" title="Naočare za rad" image="/images/faq/naocare-za-rad.png" imageAlt="Naočare za rad">
        <p>
          💡 Pojam naočara za rad se promenio u zadnjih 20 godina, pa sada postoje dve vrste naočara za rad:
        </p>
        <FaqList
          items={[
            "Za udaljenost 30–45 cm (mobilni telefoni, čitanje knjige, rad na blizu).",
            "Za udaljenost 50–100 cm — to su naočare za srednju daljinu (kompjuter, monitori, rad na dužini ruke, rad u kancelariji itd.).",
          ]}
        />
        <p>
          Osoba koja ima više od 48–50 godina starosti neće moći jasno da vidi obe udaljenosti sa monofokalnim naočarima
          (naočare za jednu udaljenost).
        </p>
        <FaqSubheading>Rešenje — kancelarijski progresiv office</FaqSubheading>
        <FaqList
          items={[
            "Jasno vidite predmete na blizu (mobilni telefoni, čitanje knjige, rad na blizu...).",
            "Jasno vidite predmete na srednjoj udaljenosti (kompjuter, monitori, rad na dužini ruke, rad u kancelariji itd.).",
          ]}
        />
        <p>Praksa je pokazala da korisnici koji nose plastična stakla novijih generacija:</p>
        <FaqList
          items={[
            "Nemaju nikakve napore prilikom gledanja u radnom prostoru.",
            "Lako se navikavaju na proizvod.",
            "Štede svoje oči.",
            "Štede svoj ram, jer nema čestih skidanja i stavljanja naočara.",
            "Štite oči od štetne plave svetlosti.",
          ]}
        />
        <FaqSubheading>Primeri</FaqSubheading>
        <p>
          Osoba radi kao kasir, ima oko 50 godina i dioptriju za blizinu +1,50 dsph. Sa tim naočarima jasno vidi deklaracije
          proizvoda ali se napreže dok kuca na tastaturi i gleda monitor. Na zahtev smanjimo dioptriju za blizinu na +1,00
          dsph — sada jasno vidi monitor ali ne vidi deklaracije, pa se tu javlja zamaranje oka.
        </p>
        <p>
          Osoba radi u administraciji, ima oko 60 godina i dioptriju za blizinu +3,00 dsph. Sa tim naočarima jasno vidi
          otpremnice ali mora stalno da stavlja naočare za srednju daljinu +2,25 da bi jasno videla monitor. Kada završi sa
          poslom stavlja treće naočare, za daljinu +1,00 da bi mogla da vozi, hoda ulicom i gleda TV. Prilično nekomforno
          nošenje troje naočara.
        </p>
        <FaqNote>Primera ima još dosta i svi se mogu rešiti multifokalnim/progresivnim naočarima.</FaqNote>
      </FaqSection>

      <FaqSection id="kvalitetna-stakla" title="Zašto odabrati kvalitetna plastična stakla">
        <p>
          Ovu temu ćemo vam približiti iz ugla nosioca naočara, ne iz ugla trgovca, jer i mi, optičari Mirjana i Vladimir,
          kao i naša ćerka nosimo naočare ceo život pa vam prenosimo lično iskustvo (Vladimir se izvukao sa najmanjom
          dioptrijom 🙄).
        </p>

        <FaqSubheading>✨ Premium kvalitet</FaqSubheading>
        <p>Imaju znatno osetniju razliku od osnovnog sloja HMC (hard multi coat).</p>
        <FaqList
          items={[
            "Samo brisanje stakala je dosta lakše, bez ostavljanja tragova.",
            "Otpornija su na sitne ogrebotine (ali ne i ona mehanička oštećenja kada ih izgrebe neki čvrst predmet), pa im je i trajanje duže od osnovnog HMC.",
            "Zbog kvalitetnijih supstanci u antireflex sloju donose veću oštrinu gledanja, što je od izuzetne važnosti za ljude koji naočare nose po ceo dan, za ljude koji imaju visoke dioptrije, cilindre i drugo.",
            "Imaju UV zaštitu od dnevnog svetla, koje je dosta štetno za oči.",
            "Takva plastična stakla su tretirana kvalitetnim zaštitnim slojevima da bi mogla korisniku da obezbede maksimalnu udobnost.",
          ]}
        />
        <FaqNote variant="danger">Vremenski okvir zamene je nakon 3–4 godine.</FaqNote>
        <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white/80">
          <Image src="/images/faq/premium-kvalitet.png" alt="Premium kvalitet plastičnih stakala" width={1200} height={600} className="h-auto w-full object-contain" />
        </figure>

        <FaqSubheading>Uporedjenje Crizal premaza</FaqSubheading>
        <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white/80">
          <Image src="/images/faq/crizal-uporedjenje.png" alt="Crizal uporedjenje premaza" width={1200} height={700} className="h-auto w-full object-contain" />
        </figure>

        <FaqSubheading>✨ Srednji kvalitet — Satin Coat, Silken, Ion Coat</FaqSubheading>
        <p>
          Sadrže manji broj zaštitnih slojeva u odnosu na premium kvalitet ali su svakako mnogo bolja opcija od osnovnog HMC
          sloja. Nanose se sa obe strane plastičnog stakla, kao i kod premium klase.
        </p>
        <FaqList
          items={[
            "Superhidrofobik — otpornost na kapljice vode.",
            "Antistatik — odbija čestice prašine.",
            "Antirefleks — smanjuje neželjenu refleksiju.",
            "HC tvrdi sloj — otpornost na grebanje.",
          ]}
        />
        <FaqNote variant="danger">Vremenski okvir zamene je nakon 2 godine.</FaqNote>
        <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white/80">
          <Image src="/images/faq/srednji-kvalitet.png" alt="Srednji kvalitet stakala" width={1200} height={600} className="h-auto w-full object-contain" />
        </figure>

        <FaqSubheading>Osnovni kvalitet — HMC hard multi coat</FaqSubheading>
        <p>
          Sloj nažalost najviše u upotrebi i odavno ne može da se nazove dobrom investicijom za vaše oči iz sledećih
          razloga:
        </p>
        <FaqList
          items={[
            "Koristi tehnologiju staru skoro 70 godina.",
            "Nanosi se u manjem broju slojeva.",
            "Sadrži mali broj supstanci u slojevima koji ne nude najveću oštrinu slike i UV zaštitu za oči.",
            "Stakla se brzo prljaju, oštećuju, teško čiste...",
          ]}
        />
        <FaqNote variant="danger">Vremenski okvir zamene je nakon godinu dana.</FaqNote>
        <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white/80">
          <Image src="/images/faq/osnovni-kvalitet-hmc.png" alt="Osnovni kvalitet HMC" width={1200} height={600} className="h-auto w-full object-contain" />
        </figure>
        <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white/80">
          <Image src="/images/faq/debela-stakla.png" alt="Debela dioptrijska stakla" width={1200} height={600} className="h-auto w-full object-contain" />
        </figure>
      </FaqSection>

      <FaqSection id="katarakta" title="Katarakta — zamućenje očnog sočiva">
        <p>
          Razvija se postepeno i može dovesti do jako lošeg vida. Najčešće se javlja usled izlaganja oka UV svetlu ali i kao
          deo prirodnog procesa starenja. Može da se pojavi i kod mlađih osoba usled povreda, dijabetesa, upotrebe određenih
          lekova ili naslednih faktora.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white/80">
            <Image src="/images/faq/katarakta-faze-1.png" alt="Faze katarakte - početna i nezrela" width={600} height={400} className="h-auto w-full object-contain" />
            <figcaption className="border-t border-black/10 px-4 py-3 text-sm text-neutral-950/45">Početna (Incipient) i nezrela (Immature) faza</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white/80">
            <Image src="/images/faq/katarakta-faze-2.png" alt="Faze katarakte - zrela i prezrela" width={600} height={400} className="h-auto w-full object-contain" />
            <figcaption className="border-t border-black/10 px-4 py-3 text-sm text-neutral-950/45">Zrela (Mature) i prezrela (Hypermature) faza</figcaption>
          </figure>
        </div>
        <FaqSubheading>Simptomi katarakte</FaqSubheading>
        <FaqList
          items={[
            "Zamagljen ili mutan vid.",
            "Teškoće pri čitanju, naročito pri slabijem osvetljenju.",
            "Osetljivost na svetlo i odsjaj.",
            "Česta potreba za promenom dioptrije.",
            "Slabljenje vida noću.",
            "Slabljenje boja — boje mogu delovati bleđe.",
          ]}
        />
        <FaqSubheading>Lečenje</FaqSubheading>
        <p>
          U ranoj fazi, simptomi katarakte mogu se ublažiti nošenjem odgovarajućih naočara ili sočiva. Međutim,{" "}
          <strong className="text-accent">jedini efikasan način lečenja</strong> katarakte jeste hirurško uklanjanje zamućenog
          sočiva i njegovo zamenjivanje veštačkim intraokularnim sočivom (IOL). Operacija je rutinska, bezbolna i veoma
          uspešna.
        </p>
        <FaqSubheading>Prevencija</FaqSubheading>
        <p>
          Nošenje kvalitetnih naočara za sunce može smanjiti rizik od zamućenja sočiva. Razlog tome je što se sprečava
          prolazak štetnog UV svetla koje oštećuje ćelije oka, a sočivo je prvo na udaru, kao i mrežnjača na kojoj se
          nalazi tačka najjasnijeg vida: žuta mrlja.
        </p>
        <p>
          Ako nas pitate, <strong className="text-accent">nošenje naočara za sunce je bitno upravo zbog zaštite oka</strong> a
          mnogi nisu toga svesni pa biraju one lošijeg kvaliteta, bez UV filtera, polarizacije itd. Manje je štetno da nemate
          naočare za sunce nego da imate one lošeg kvaliteta. Jer se usled tamnih stakala zenica raširi između 6–8 mm i
          propusti veliku količinu UV svetla, dok se 2–3 mm rašire zenice kada se izlože jakom svetlu kada nemate naočare.
        </p>
        <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white/80">
          <Image src="/images/faq/katarakta-simptomi.png" alt="Simptomi, lečenje i prevencija katarakte" width={1200} height={600} className="h-auto w-full object-contain" />
        </figure>
      </FaqSection>

      <FaqSection
        id="osteceni-zastitni-slojevi"
        title="Oštećeni zaštitni slojevi na staklima"
        image="/images/faq/osteceni-slojevi.png"
        imageAlt="Primeri oštećenih zaštitnih slojeva"
        imageCaption="Na slikama su prikazani neki od primera oštećenih zaštitnih slojeva."
      >
        <p>
          Antirefleksni sloj se nanosi na dioptrijska stakla kako bi se smanjila refleksija i poboljšala transparentnost.
          Oštećenje može dovesti do smanjene funkcionalnosti i{" "}
          <strong className="text-neutral-950">lošije oštrine vida</strong>.
        </p>
        <FaqSubheading>Mehaničko oštećenje — najčešća pojava</FaqSubheading>
        <p>
          Javlja se tokom čišćenja ili nošenja. Uzrok je nepravilno brisanje, korišćenje grubih ili abrazivnih materijala ili
          predmeta koji ogrebu staklo.
        </p>
        <FaqSubheading>Hemijske supstance — retka pojava</FaqSubheading>
        <p>
          Kontakt sa hemikalijama poput acetona, alkohola, kozmetike, razređivača i sl., koje mogu oštetiti premaz i okvir.
        </p>
        <FaqSubheading>Visoka temperatura — retka pojava</FaqSubheading>
        <p>
          Stakla ne treba izlagati visokoj toploti — npr. ostavljanje u autu ispod vetrobranskog stakla, blizu fena za kosu
          ili pare iz rerne.
        </p>
        <FaqSubheading>Neispravna proizvodnja — retka pojava</FaqSubheading>
        <p>
          U retkim slučajevima premaz nije pravilno nanošen. U 19 godina iskustva, ovo je najmanji procenat oštećenja, naročito
          kod premium proizvođača kao što su Essilor, Zeiss i Hoya.
        </p>
        <FaqList
          items={[
            "Naočare izložene velikoj temperaturi (npr. ostavljene u autu na preko 50°C, feniranje kose, vrela para iz rerne...).",
            "Starost plastičnih stakala veća od 3–4 godine i/ili izlaganje/brisanje neprilagođenim tkaninama i tečnostima.",
            "Starost plastičnih stakala veća od 6–7 godina.",
            "Normalna pojava kod slojeva niskog kvaliteta ili usled propusta u nanošenju slojeva zaštite u fabrici (loša proizvodnja).",
          ]}
        />
      </FaqSection>

      <FaqSection id="prizme-prizma-folija" title="Prizma stakla, prizma folije i prizmatične naočare">
        <FaqList
          items={[
            "Prizme u naočarima su specijalna optička korekcija koja ne menja dioptriju, već pomera sliku na mrežnjači ka položaju gde oko prirodno gleda.",
            "Njihova osnovna svrha je da smanje ili uklone potrebu očiju da se „forsirano usklađuju“, čime se rasterećuju očni mišići.",
            "Najčešće se primenjuju kod strabizma (razrokosti), heteroforija, duplih slika (diplopija), kao i kod zamora očiju, glavobolja i problema sa koncentracijom pri radu na blizinu.",
            "Prizma stakla se prave do 5 dioptrija prizmi, praveći se po recepturnom zahtevu (to znači da nisu lagerska plastična stakla). Ukoliko je indikovana veća prizma dioptrija, ugrađuje se folija.",
            "Prizma folije su tanke, providne folije koje se postavljaju/lepe na staklo sa unutrašnje strane naočara.",
            "Koriste se kao privremeno, probno ili dijagnostičko rešenje, ali i u situacijama kada se jačina prizme često menja.",
            "Pravilno određena prizma omogućava bolju saradnju oba oka, jasniji i stabilniji vid, uz znatno manji napor.",
            "Kod dece sa strabizmom, tj. razrokosti ili skrivenog bežanja oka, mozak često ulaže dodatni napor da „spoji sliku“ koju vide oba oka.",
            "Prizma ne ispravlja oko mehanički, ali olakšava pravilan rad očiju i mozga, što može doprineti boljoj koncentraciji, učenju i manjem umoru u školi.",
            "U dečjem uzrastu često se koriste prizma folije, jer omogućavaju postepeno prilagođavanje i lako menjanje jačine korekcije kako dete raste.",
          ]}
        />
        <FaqNote>
          👁️‍🗨️ Rano otkrivanje i pravilna korekcija imaju veliki značaj za razvoj binokularnog vida kod dece.
        </FaqNote>
        <FaqNote variant="warning">
          ⚠️ Prizmatična korekcija se uvek određuje individualno, na osnovu detaljnog strabološko-oftalmološkog pregleda.
        </FaqNote>
        <div className="grid gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white/80">
            <Image src="/images/faq/prizme.png" alt="Prizme u naočarima" width={600} height={400} className="h-auto w-full object-contain" />
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white/80">
            <Image src="/images/faq/prizma-naocare.png" alt="Prizmatične naočare" width={600} height={400} className="h-auto w-full object-contain" />
          </figure>
        </div>
      </FaqSection>

      <FaqSection
        id="plastična-stakla-u-boji"
        title="Plastična stakla u boji"
        image="/images/faq/stakla-u-boji.png"
        imageAlt="Plastična stakla u boji"
      >
        <p>
          🕶️ Plastična stakla u boji mogu se izraditi <strong className="text-neutral-950">sa ili bez dioptrije</strong>. Lagana su,
          udobna za nošenje i odličan izbor za zaštitu očiju na otvorenom prostoru ☀️
        </p>
        <p>Dostupna su u raznim nijansama, najčešće sivoj, zelenoj i braon, kao i u različitim jačinama zatamnjenja:</p>
        <FaqList items={["Blagi tonovi (25%)", "Srednji (50%)", "Klasične sunčane boje (75%)"]} />
        <p>
          Postoji i gradual / gradasol (gradient) opcija, sa postepenim zatamnjenjem (npr. od 75% pri vrhu do 0% pri dnu)
          😎
        </p>
        <p>
          <strong className="text-accent">Sva stakla imaju 100% UV zaštitu (UVA i UVB filter)</strong> 🛡️ i pomažu da se oči
          manje zamaraju — bilo da ste za volanom 🚗, u šetnji, pored vode 🌊 ili u prirodi. Pogodna su i za decu i za
          odrasle 🧑‍🤝‍🧑
        </p>
        <p>
          U Optici Kosović možete izabrati boju, jačinu zatamnjenja i dodatke, a mi smo tu da pomognemo i preporučimo najbolje
          rešenje za vaše oči 🤝. Postoje lagerske varijante po cenama od oko 5.000–6.000 RSD, kao i{" "}
          <strong className="text-neutral-950">izrada po porudžbini</strong> — za posebne dioptrije, boje, materijale i zakrivljenost
          prema okviru.
        </p>
        <FaqNote variant="warning">📍 Svratite, probajte i pronađite kombinaciju koja vam najviše prija 😊</FaqNote>
      </FaqSection>
    </div>
  );
}
