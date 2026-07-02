--
-- PostgreSQL database dump
--

\restrict HfSfJs26lhkBhrnCvSlbLflcHECEiaHxzEvQwPvrpD4i34nXfjzlE8eilpBY9qQ

-- Dumped from database version 18.4 (eaf151e)
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."Mentee" DROP CONSTRAINT IF EXISTS "Mentee_mentorId_fkey";
ALTER TABLE IF EXISTS ONLY public."Hint" DROP CONSTRAINT IF EXISTS "Hint_mentorId_fkey";
DROP INDEX IF EXISTS public."Mentor_studentId_key";
DROP INDEX IF EXISTS public."Mentee_studentId_key";
DROP INDEX IF EXISTS public."Mentee_mentorId_key";
DROP INDEX IF EXISTS public."Hint_mentorId_level_key";
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."Mentor" DROP CONSTRAINT IF EXISTS "Mentor_pkey";
ALTER TABLE IF EXISTS ONLY public."Mentee" DROP CONSTRAINT IF EXISTS "Mentee_pkey";
ALTER TABLE IF EXISTS ONLY public."Hint" DROP CONSTRAINT IF EXISTS "Hint_pkey";
ALTER TABLE IF EXISTS ONLY public."AdmissionYear" DROP CONSTRAINT IF EXISTS "AdmissionYear_pkey";
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TABLE IF EXISTS public."Mentor";
DROP TABLE IF EXISTS public."Mentee";
DROP TABLE IF EXISTS public."Hint";
DROP TABLE IF EXISTS public."AdmissionYear";
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AdmissionYear; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdmissionYear" (
    id text NOT NULL,
    "mentorYear" text NOT NULL,
    "menteeYear" text NOT NULL
);


--
-- Name: Hint; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Hint" (
    id text NOT NULL,
    content text NOT NULL,
    "mentorId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    level integer NOT NULL
);


--
-- Name: Mentee; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Mentee" (
    id text NOT NULL,
    "studentId" text NOT NULL,
    "mentorId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    password text,
    name text,
    point integer DEFAULT 0 NOT NULL,
    "unlockedHintLevels" integer[] DEFAULT ARRAY[]::integer[],
    "unlockedCosmetics" text[] DEFAULT ARRAY[]::text[],
    "equippedEffect" text
);


--
-- Name: Mentor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Mentor" (
    id text NOT NULL,
    "studentId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    password text,
    name text,
    "isAdmin" boolean DEFAULT false NOT NULL,
    point integer DEFAULT 0 NOT NULL,
    "unlockedCosmetics" text[] DEFAULT ARRAY[]::text[],
    "equippedEffect" text
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Data for Name: AdmissionYear; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."AdmissionYear" (id, "mentorYear", "menteeYear") FROM stdin;
cmq7jp1lf00009on43ci8ja0b	68	69
\.


--
-- Data for Name: Hint; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Hint" (id, content, "mentorId", "createdAt", level) FROM stdin;
cmr056foc0001hon4qdk44wo7	ผู้ชาย	cmq7hq41i000s2on4v565wvi6	2026-06-30 04:23:51.516	1
cmr056u0y0002hon4ef8z3zkq	เว็บ	cmq7hq41i000s2on4v565wvi6	2026-06-30 04:24:10.114	2
cmr1c6yvm0000hwn4twpc3b0v	next.js	cmq7hq41i000s2on4v565wvi6	2026-07-01 00:27:59.89	3
cmr1c7fae0001hwn4d3n0ze37	ใส่แว่น	cmq7hq41i000s2on4v565wvi6	2026-07-01 00:28:21.158	4
cmr1gmym10000vsn4t7sxmuna	163cm	cmq7hq41i000s2on4v565wvi6	2026-07-01 02:32:24.505	5
cmr1novtx0000c4qzac64a1c8	test level 1	cmq7hq41i000f2on4wfqr6x29	2026-07-01 05:49:51.525	1
cmr1qmqwv0000ugah47d11sdv	Racha	cmq7hq41i00122on4phwkvftv	2026-07-01 07:12:10.687	2
cmr27730h0000kwqzxftvnyhw	test level 2	cmq7hq41i000f2on4wfqr6x29	2026-07-01 14:55:53.346	2
\.


--
-- Data for Name: Mentee; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Mentee" (id, "studentId", "mentorId", "createdAt", "updatedAt", password, name, point, "unlockedHintLevels", "unlockedCosmetics", "equippedEffect") FROM stdin;
cmq7hy5j8001l2on46btqxgjj	69090500401	cmq7hq41h00002on4t48ma199	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001m2on4gq0sv6eq	69090500402	cmq7hq41h00012on4zxhgs93h	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001n2on4mmla6zsa	69090500403	cmq7hq41h00022on4z6e0mnec	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001o2on44tspiw8l	69090500404	cmq7hq41h00032on46hchsfe4	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001p2on4dq7krlmy	69090500405	cmq7hq41i00042on489qvhjju	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001q2on4w3dflhbf	69090500406	cmq7hq41i00052on485p7eal8	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001r2on496ns2pn3	69090500407	cmq7hq41i00062on442mg81nb	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001s2on4ihlddd3m	69090500408	cmq7hq41i00072on4ns4fopk4	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001t2on47rrr916e	69090500409	cmq7hq41i00082on44z2ydvu8	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001u2on4r7hagfec	69090500410	cmq7hq41i00092on48xqcutdg	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001v2on4tqvd0kn8	69090500411	cmq7hq41i000a2on4zt32lbvi	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001w2on49dkcdanx	69090500412	cmq7hq41i000b2on4x5ydgdjz	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001x2on4dxmem37q	69090500413	cmq7hq41i000c2on4u1q1v3ml	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001y2on4r6k6jewg	69090500414	cmq7hq41i000d2on4475czbfi	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9001z2on4z9y5rzcb	69090500415	cmq7hq41i000e2on4sgt1ugei	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j900212on47aykqizq	69090500417	cmq7hq41i000g2on4oab21wy4	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j900222on4ycrhwz6l	69090500418	cmq7hq41i000h2on4kc8r614d	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j900232on4v11nvhyq	69090500419	cmq7hq41i000i2on4kvddv6qk	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j900242on4jorckh12	69090500420	cmq7hq41i000j2on45e00ovqw	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j900252on4gc848ml8	69090500421	cmq7hq41i000k2on47v7acqn0	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j900262on4spmuvdew	69090500422	cmq7hq41i000l2on48pj7kdx9	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j900272on461knti91	69090500423	cmq7hq41i000m2on4ishok368	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j900282on4ozrurdha	69090500424	cmq7hq41i000n2on4v0jcmw83	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j900292on4l64owxg8	69090500425	cmq7hq41i000o2on4b57dk1zk	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9002a2on4nuu2ycux	69090500426	cmq7hq41i000p2on49d947ymx	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5j9002b2on4ig0pkoca	69090500427	cmq7hq41i000q2on40v3gkuy3	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002c2on449dvp3yn	69090500428	cmq7hq41i000r2on4khwbptys	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002e2on4fsjio2dr	69090500430	cmq7hq41i000t2on40b3qi8fx	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002f2on4gqgy2chw	69090500431	cmq7hq41i000u2on4keb2h0x0	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002g2on4cu5rf8ua	69090500432	cmq7hq41i000v2on48cer7mhz	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002h2on4vbrfmc0q	69090500433	cmq7hq41i000w2on4ie5e1q7z	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002i2on4tbzwdtx1	69090500434	cmq7hq41i000x2on45yicf2b3	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002j2on4k29m1sdb	69090500435	cmq7hq41i000y2on473053sbe	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002k2on4iypiyv8t	69090500436	cmq7hq41i000z2on46dp76xad	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002l2on4yn5uz2tx	69090500437	cmq7hq41i00102on4alkk6elp	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002m2on460za6ki7	69090500438	cmq7hq41i00112on468mmheei	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002n2on41djzsjfh	69090500439	cmq7hq41i00122on4phwkvftv	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002o2on4o1s2k514	69090500440	cmq7hq41i00132on4r6ooldb9	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002p2on4s05cuoiq	69090500441	cmq7hq41i00142on462k6km7i	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002q2on4xc32afdt	69090500442	cmq7hq41i00152on4ds6fu1gc	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002r2on4z5ganj8j	69090500443	cmq7hq41i00162on4hp8vrkmj	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002s2on4p84rla6a	69090500444	cmq7hq41i00172on4qq4tdpuh	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002t2on4ttbwx4w5	69090500445	cmq7hq41i00182on4n97tl4nh	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002u2on4mftb9s3q	69090500446	cmq7hq41i00192on4orpkpx1g	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002v2on49pja7rrn	69090500447	cmq7hq41i001a2on4kqqgnt5m	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002w2on4yebro012	69090500448	cmq7hq41j001b2on4sxsht78h	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002x2on4o6knkrjp	69090500449	cmq7hq41j001c2on4jrpszxnh	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002y2on4cg81gs46	69090500450	cmq7hq41j001d2on4zqmyut4i	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002z2on439ylo1a8	69090500451	cmq7hq41j001e2on4yjks7qna	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja00302on4d8f2zb0m	69090500452	cmq7hq41j001f2on4q4d0b75w	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja00312on44cyo09k1	69090500453	cmq7hq41j001g2on4gcfgjlqq	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5jb00322on4a634tprq	69090500454	cmq7hq41j001h2on4mhstcxjn	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5jb00332on4fdw980ra	69090500455	cmq7hq41j001i2on4z864dfcr	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5jb00342on4c4ee9gtm	69090500456	cmq7hq41j001j2on4sxm2a754	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5jb00352on4juikun80	69090500457	cmq7hq41j001k2on4a8wf2slg	2026-06-10 03:16:01.028	2026-06-10 03:16:01.028	\N	\N	0	{}	{}	\N
cmq7hy5ja002d2on4tpx3vv34	69090500429	cmq7hq41i000s2on4v565wvi6	2026-06-10 03:16:01.028	2026-07-01 14:23:33.626	$2b$10$UCvDNL.4KvE2JtjbJcCPn.AGdHE/23wsseyaHmH5tX3CLYJEPPeBS	\N	50	{1,5}	{effect-sparkle,effect-ribbon}	effect-ribbon
cmq7hy5j900202on48fyuvd43	69090500416	cmq7hq41i000f2on4wfqr6x29	2026-06-10 03:16:01.028	2026-06-26 05:25:22.19	\N	\N	0	{}	{}	\N
\.


--
-- Data for Name: Mentor; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Mentor" (id, "studentId", "createdAt", "updatedAt", password, name, "isAdmin", point, "unlockedCosmetics", "equippedEffect") FROM stdin;
cmq7hq41h00002on4t48ma199	68090500401	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41h00012on4zxhgs93h	68090500402	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41h00022on4z6e0mnec	68090500403	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41h00032on46hchsfe4	68090500404	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00042on489qvhjju	68090500405	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00052on485p7eal8	68090500406	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00062on442mg81nb	68090500407	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00072on4ns4fopk4	68090500408	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00082on44z2ydvu8	68090500409	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00092on48xqcutdg	68090500410	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000a2on4zt32lbvi	68090500411	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000b2on4x5ydgdjz	68090500412	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000c2on4u1q1v3ml	68090500413	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000d2on4475czbfi	68090500414	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000e2on4sgt1ugei	68090500415	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000g2on4oab21wy4	68090500417	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000h2on4kc8r614d	68090500418	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000i2on4kvddv6qk	68090500419	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000j2on45e00ovqw	68090500420	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000k2on47v7acqn0	68090500421	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000l2on48pj7kdx9	68090500422	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000m2on4ishok368	68090500423	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000n2on4v0jcmw83	68090500424	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000o2on4b57dk1zk	68090500425	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000p2on49d947ymx	68090500426	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000q2on40v3gkuy3	68090500427	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000r2on4khwbptys	68090500428	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000t2on40b3qi8fx	68090500430	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000u2on4keb2h0x0	68090500431	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000v2on48cer7mhz	68090500432	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000w2on4ie5e1q7z	68090500433	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000x2on45yicf2b3	68090500434	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000y2on473053sbe	68090500435	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i000z2on46dp76xad	68090500436	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00102on4alkk6elp	68090500437	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00112on468mmheei	68090500438	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00132on4r6ooldb9	68090500440	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00142on462k6km7i	68090500441	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00152on4ds6fu1gc	68090500442	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00162on4hp8vrkmj	68090500443	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00172on4qq4tdpuh	68090500444	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00182on4n97tl4nh	68090500445	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00192on4orpkpx1g	68090500446	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i001a2on4kqqgnt5m	68090500447	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41j001b2on4sxsht78h	68090500448	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41j001c2on4jrpszxnh	68090500449	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41j001d2on4zqmyut4i	68090500450	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41j001e2on4yjks7qna	68090500451	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41j001f2on4q4d0b75w	68090500452	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41j001g2on4gcfgjlqq	68090500453	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41j001h2on4mhstcxjn	68090500454	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41j001i2on4z864dfcr	68090500455	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41j001j2on4sxm2a754	68090500456	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41j001k2on4a8wf2slg	68090500457	2026-06-10 03:09:45.845	2026-06-10 03:09:45.845	\N	\N	f	0	{}	\N
cmq7hq41i00122on4phwkvftv	68090500439	2026-06-10 03:09:45.845	2026-07-01 07:25:25.661	$2b$10$lxpBCM3TUnrQ0Vey4dOEK.99uVurm3NiQVdk2en426Dl4UUh.ebMS	\N	f	105	{}	\N
cmq7hq41i000f2on4wfqr6x29	68090500416	2026-06-10 03:09:45.845	2026-07-01 12:48:50.574	$2b$10$LN6athDmXf4.YW2Sp3B9.eMy2qMg6OHKkXImlgXM5eTdKhjQ/D5oe	\N	t	252	{}	\N
cmq7hq41i000s2on4v565wvi6	68090500429	2026-06-10 03:09:45.845	2026-07-01 03:48:11.821	$2b$10$rsHgCAfXcKk/.qTzi6xo5OopoZWv7SoM6R7t1sNgFOwbNGRFku6lS	Asnawee Ezor	t	150	{}	\N
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
29866be9-1d43-40c2-85cc-0b282ab4bc4e	3b3ab1c2d004bcd13485bab9b824f5b875a22981d3e6d69b34edf01d3c885df9	2026-06-09 13:52:28.604465+00	20260609135224_init	\N	\N	2026-06-09 13:52:25.910144+00	1
c6ef503e-f239-4e52-a41e-d213793e0266	c72049f99e0247dfba2357f1bc46cca80bbc4ac649f5fc04b9a85144b4bb07ed	2026-06-09 13:54:14.941568+00	20260609135410_init	\N	\N	2026-06-09 13:54:11.520104+00	1
74b3cdcc-2547-4bfc-9eed-00af2f2b9ec0	55b0c699c66ed97905eb7d584e4e7f72113acd3accb10b51e585efabaf9bdccc	2026-06-10 01:08:55.757975+00	20260610010852_init	\N	\N	2026-06-10 01:08:53.846817+00	1
a0024c8f-c88d-4bb6-99fb-b0c773a9e9ca	f44caf401c8d0efe575b7905d8a9956f357530d1144fec884b7e8f3594c3697a	2026-06-10 03:30:17.630985+00	20260610033014_init	\N	\N	2026-06-10 03:30:15.629425+00	1
990e1d67-c862-40df-86f6-230710b9849c	9b343cfeb844eeba518b484b9a4517a742d8b906123e7bf4c276cf3ffe670a5a	2026-06-10 03:59:03.361692+00	20260610035900_init	\N	\N	2026-06-10 03:59:01.751438+00	1
8aaf30cc-2247-4937-9b80-8cb86e3237a8	b195e024562cfbfa59bdd65a9a70d483da27609849e1f023be1b0d437cb34c5f	2026-06-17 14:33:46.955552+00	20260617143343_add_password	\N	\N	2026-06-17 14:33:45.215633+00	1
2fb112f8-a80d-42f1-b9b7-63e616d87adb	01d3074003ab3f0421221bbcb3f870dfd5197a3afbdcf609531c977ddd2b1df9	2026-06-23 09:33:25.494544+00	20260623093322_add_name	\N	\N	2026-06-23 09:33:23.775808+00	1
4b879e5e-cada-496d-af93-e816ca5b3a26	6fe8c47d55cec350ab1c379274e5fb7d80e739c92da35e7f3b942728a4a6bf74	2026-06-26 06:19:55.055447+00	20260626061846_add_is_admin	\N	\N	2026-06-26 06:19:53.440248+00	1
\.


--
-- Name: AdmissionYear AdmissionYear_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdmissionYear"
    ADD CONSTRAINT "AdmissionYear_pkey" PRIMARY KEY (id);


--
-- Name: Hint Hint_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Hint"
    ADD CONSTRAINT "Hint_pkey" PRIMARY KEY (id);


--
-- Name: Mentee Mentee_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Mentee"
    ADD CONSTRAINT "Mentee_pkey" PRIMARY KEY (id);


--
-- Name: Mentor Mentor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Mentor"
    ADD CONSTRAINT "Mentor_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Hint_mentorId_level_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Hint_mentorId_level_key" ON public."Hint" USING btree ("mentorId", level);


--
-- Name: Mentee_mentorId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Mentee_mentorId_key" ON public."Mentee" USING btree ("mentorId");


--
-- Name: Mentee_studentId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Mentee_studentId_key" ON public."Mentee" USING btree ("studentId");


--
-- Name: Mentor_studentId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Mentor_studentId_key" ON public."Mentor" USING btree ("studentId");


--
-- Name: Hint Hint_mentorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Hint"
    ADD CONSTRAINT "Hint_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES public."Mentor"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Mentee Mentee_mentorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Mentee"
    ADD CONSTRAINT "Mentee_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES public."Mentor"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict HfSfJs26lhkBhrnCvSlbLflcHECEiaHxzEvQwPvrpD4i34nXfjzlE8eilpBY9qQ

