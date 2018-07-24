require('dotenv/config');

import * as admin from 'firebase-admin';
import { Api } from '../services/api';

const serviceAccount = require('../../creds.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

// const api = new Api(db);

run()
  .then(() => console.log(''))
  .catch(err => (err))

async function run(): Promise<boolean> {

  // const color = await api.getColor('#ff0000');
  // console.log(color);
  const data = getData();

  const actions = [];
  for(let row of data){
    const obj:any = {};
    obj.id = row[2];
    obj.name = (row[0] + '').toLowerCase();
    obj.name_nl = (row[1] + '').toLowerCase();

    actions.push( db.collection('colors').doc(obj.id).set(obj, { merge: true}) );
    // await db.collection('colors').doc(obj.id).set(obj, { merge: true});
    console.log(`"${obj.id}","${obj.id}","${obj.name}","${obj.name_nl}"`);

    // items.push(obj);
  }

  await Promise.all(actions);

  // console.log('Done :-)');


  return true;
}

function getData(): any[] {
  let data = getRawData().split(/\r?\n/).map(p => (p || '').trim());
  data =  data.filter( p=> p.length > 0);
  return data.map( p => p.split(/,/));
}

function getRawData() {
  return `
  Crimson,Karmijn,#dc143c
  Red,Rood,#ff0000
  Red2,Rood2,#ee0000
  Red3,Rood3,#cd0000
  Red4,Rood4/Donkerrood,#8b0000
  Firebrick,Steenrood,#b22222
  Firebrick1,Steenrood1,#ff3030
  Firebrick2,Steenrood2,#ee2c2c
  Firebrick3,Steenrood3,#cd2626
  Firebrick4,Steenrood4,#8b1a1a
  IndianRed,Indischrood,#cd5c5c
  IndianRed1,Indischrood1,#ff6a6a
  IndianRed2,Indischrood2,#ee6363
  IndianRed3,Indischrood3,#cd5555
  IndianRed4,Indischrood4,#8b3a3a
  LightCoral,Lichtkoraal,#f08080
  OrangeRed,Oranjerood,#ff4500
  OrangeRed2,Oranjerood2,#ee4000
  OrangeRed3,Oranjerood3,#cd3700
  OrangeRed4,Oranjerood4,#8b2500
  Tomato,Tomaat,#ff6347
  Tomato2,Tomaat2,#ee5c42
  Tomato3,Tomaat3,#cd4f39
  Tomato4,Tomaat4,#8b3626
  Coral,Koraal,#ff7f50
  Coral1,Koraal1,#ff7256
  Coral2,Koraal2,#ee6a50
  Coral3,Koraal3,#cd5b45
  Coral4,Koraal4,#8b3e2f
  Salmon,Zalm,#fa8072
  Salmon1,Zalm1,#ff8c69
  Salmon2,Zalm2,#ee8262
  Salmon3,Zalm3,#cd7054
  Salmon4,Zalm4,#8b4c39
  DarkSalmon,Donkerzalm,#e9967a
  LightSalmon,Lichtzalm,#ffa07a
  LightSalmon2,Lichtzalm2,#ee9522
  LightSalmon3,Lichtzalm3,#cd8162
  LightSalmon4,Lichtzalm4,#8b5242
  DarkOrange,Donkeroranje,#ff8c00
  DarkOrange1,Donkeroranje1,#ff7f00
  DarkOrange2,Donkeroranje2,#ee7600
  DarkOrange3,Donkeroranje3,#cd6600
  DarkOrange4,Donkeroranje4,#8b4500
  Orange,Oranje,#ffa500
  Orange2,Oranje2,#ee9a00
  Orange3,Oranje3,#cd8500
  Orange4,Oranje4,#8b5a00
  DarkGoldenrod,Guldenroede,#b8860b
  DarkGoldenrod1,Guldenroede1,#ffb90f
  DarkGoldenrod2,Guldenroede2,#eead0e
  DarkGoldenrod3,Guldenroede3,#cd950c
  DarkGoldenrod4,Guldenroede4,#8b6508
  Goldenrod,Guldenroede,#daa520
  Goldenrod1,Guldenroede1,#ffc125
  Goldenrod2,Guldenroede2,#eeb422
  Goldenrod3,Guldenroede3,#cd9b1d
  Goldenrod4,Guldenroede4,#8b6914
  Gold,Goud,#ffd700
  Gold2,Goud2,#eec900
  Gold3,Goud3,#cdad00
  Gold4,Goud4,#8b7500
  LightGoldenrod,Lichtguldenroede,#eedd82
  LightGoldenrod1,Lichtguldenroede1,#ffec8b
  LightGoldenrod2,Lichtguldenroede2,#eedc82
  LightGoldenrod3,Lichtguldenroede3,#cdbe70
  LightGoldenrod4,Lichtguldenroede4,#8b814c
  PaleGoldenrod,Faalguldenroede,#eee8aa
  Yellow,Geel,#ffff00
  Yellow2,Geel2,#eeee00
  Yellow3,Geel3,#cdcd00
  Yellow4,Geel4,#8b8b00
  LtGoldenrodYello,Lichtguldenroedegeel,#fafad2
  LightYellow,Lichtgeel,#ffffe0
  LightYellow2,Lichtgeel2,#eeeed1
  LightYellow3,Lichtgeel3,#cdcdb4
  LightYellow4,Lichtgeel4,#8b8b7a
  Cornsilk,Maiszijde,#fff8dc
  Cornsilk2,Maiszijde2,#eee8cd
  Cornsilk3,Maiszijde3,#cdc8b1
  Cornsilk4,Maiszijde4,#8b8878
  Ivory,Ivoor,#fffff0
  Ivory2,Ivoor2,#eeeee0
  Ivory3,Ivoor3,#cdcdc1
  Ivory4,Ivoor4,#8b8b83
  LemonChiffon,Citroengarnering,#fffacd
  LemonChiffon2,Citroengarnering2,#eee9bf
  LemonChiffon3,Citroengarnering3,#cdc9a5
  LemonChiffon4,Citroengarnering4,#8b8970
  Khaki,Kaki,#fff68f
  Khaki2,Kaki2,#eee685
  Khaki3,Kaki3,#cdc673
  Khaki4,Kaki4,#8b864e
  DarkKhaki,Donkerkaki,#bdb76b
  GreenYellow,Groengeel,#adff2f
  YellowGreen,Geelgroen,#9acd32
  OliveDrab,Legergroen,#6b8e23
  OliveDrab1,Legergroen1,#c0ff3e
  OliveDrab2,Legergroen2,#b3ee3a
  OliveDrab3,Legergroen3,#9acd32
  OliveDrab4,Legergroen4,#698b22
  DarkOliveGreen,Donkerolijfgroen,#556b2f
  DarkOliveGreen1,Donkerolijfgroen1,#caff70
  DarkOliveGreen2,Donkerolijfgroen2,#bcee68
  DarkOliveGreen3,Donkerolijfgroen3,#a2cd5a
  DarkOliveGreen4,Donkerolijfgroen4,#6e8b3d
  Beige,Beige/oker,#f5f5dc
  LawnGreen,Grasgroen,#7cfc00
  Chartreuse,Chartreuse,#7fff00
  Chartreuse2,Chartreuse2,#76ee00
  Chartreuse3,Chartreuse3,#66cd00
  Chartreuse4,Chartreuse4,#458b00
  LimeGreen,Limegroen,#32cd32
  LightGreen,Lichtgroen,#90ee90
  PaleGreen,Faalgroen,#98fb98
  PaleGreen1,Faalgroen1,#9aff9a
  PaleGreen2,Faalgroen2,#90ee90
  PaleGreen3,Faalgroen3,#7ccd7c
  PaleGreen4,Faalgroen4,#548b54
  Green,Groen,#00ff00
  Green2,Groen2,#00ee00
  Green3,Groen3,#00cd00
  Green4,Groen4,#008b00
  ForestGreen,Bosgroen,#228b22
  DarkGreen,Donkergroen,#006400
  MedSpringGreen,Middenlentegroen,#00fa9a
  SpringGreen,Lentegroen,#00ff7f
  SpringGreen2,Lentegroen2,#00ee76
  SpringGreen3,Lentegroen3,#00cd66
  SpringGreen4,Lentegroen4,#008b45
  MediumSeaGreen,Middenzeegroen,#3cb371
  SeaGreen,Zeegroen,#2e8b52
  SeaGreen1,Zeegroen1,#54ff9f
  SeaGreen2,Zeegroen2,#4eee94
  SeaGreen3,Zeegroen3,#43cd80
  SeaGreen4,Zeegroen4,#2e8b52
  DarkSeaGreen,Donkerzeegroen,#8fbc8f
  DarkSeaGreen1,Donkerzeegroen1,#c1ffc1
  DarkSeaGreen2,Donkerzeegroen2,#b4eeb4
  DarkSeaGreen3,Donkerzeegroen3,#9bcd9b
  DarkSeaGreen4,Donkerzeegroen4,#698b69
  Honeydew,Honingdauw,#f0fff0
  Honeydew2,Honingdauw2,#e0eee0
  Honeydew3,Honingdauw3,#c1cdc1
  Honeydew4,Honingdauw4,#838b83
  Aquamarine,Aquamarijn,#7fffd4
  Aquamarine2,Aquamarijn2,#76eec6
  Aquamarine3,Aquamarijn3,#66cdaa
  Aquamarine4,Aquamarijn4,#458b74
  MediumAquamarine,Middenaquamarijn,#66cdaa
  LightSeaGreen,Lichtzeegroen,#20b2aa
  MediumTurquoise,Middenturquoise,#48d1cc
  Turquoise,Turquoise,#40e0d0
  Turquoise1,Turquoise1,#00f5ff
  Turquoise2,Turquoise2,#00e5ee
  Turquoise3,Turquoise4,#00c5cd
  Turquoise4,Turquoise4,#00868b
  DarkTurquoise,Donkerturquoise,#00ced1
  MintCream,Muntcreme,#f5fffa
  PaleTurquoise,Faalturkoois,#afeeee
  PaleTurquoise1,Faalturkoois1,#bbffff
  PaleTurquoise2,Faalturkoois2,#aeeeee
  PaleTurquoise3,Faalturkoois3,#96cdcd
  PaleTurquoise4,Faalturkoois4,#668b8b
  DarkSlateGray1,Donkerleigrijs1,#97ffff
  DarkSlateGray2,Donkerleigrijs2,#8deeee
  DarkSlateGray3,Donkerleigrijs3,#79cdcd
  DarkSlateGray4,Donkerleigrijs4,#528b8b
  Azure,Azuur,#f0ffff
  Azure2,Azuur2,#e0eeee
  Azure3,Azuur3,#c1cdcd
  Azure4,Azuur4,#838b8b
  LightCyan,Lichtcyaan,#e0ffff
  LightCyan2,Lichtcyaan2,#d1eeee
  LightCyan3,Lichtcyaan3,#b4cdcd
  LightCyan4,Lichtcyaan4,#7a8b8b
  Cyan,Cyaan,#00ffff
  Cyan2,Cyaan2,#00eeee
  Cyan3,Cyaan3,#00cdcd
  Cyan4,Cyaan4,#008b8b
  DarkCyan,Donkercyaan,#008b8b
  CadetBlue,Ijsblauw,#5f9ea0
  CadetBlue1,Ijsblauw1,#98f5ff
  CadetBlue2,Ijsblauw2,#8ee5ee
  CadetBlue3,Ijsblauw3,#7ac5cd
  CadetBlue4,Ijsblauw4,#52868b
  PowderBlue,Ijsblauw,#b0e0e6
  LightBlue,Lichtblauw,#add8e6
  LightBlue1,Lichtblauw1,#bfefff
  LightBlue2,Lichtblauw2,#b2dfee
  LightBlue3,Lichtblauw3,#9ac0cd
  LightBlue4,Lichtblauw4,#68838b
  AliceBlue,Aliceblauw,#f0f8ff
  LightSkyBlue,Lichthemelsblauw,#87cefa
  LightSkyBlue1,Lichthemelsblauw1,#b0e2ff
  LightSkyBlue2,Lichthemelsblauw2,#a4d3ee
  LightSkyBlue3,Lichthemelsblauw3,#8db6cd
  LightSkyBlue4,Lichthemelsblauw4,#607b8b
  SkyBlue,Hemelsblauw,#87ceff
  SkyBlue2,Hemelsblauw2,#7ec0ee
  SkyBlue3,Hemelsblauw3,#6ca6cd
  SkyBlue4,Hemelsblauw4,#4a708b
  DeepSkyBlue,Diephemelsblauw,#00bfff
  DeepSkyBlue2,Diephemelsblauw2,#00b2ee
  DeepSkyBlue3,Diephemelsblauw3,#009acd
  DeepSkyBlue4,Diephemelsblauw4,#00688b
  SteelBlue,Staalblauw,#4682b4
  SteelBlue1,Staalblauw1,#63b8ff
  SteelBlue2,Staalblauw2,#5cacee
  SteelBlue3,Staalblauw3,#4f94cd
  SteelBlue4,Staalblauw4,#36648b
  DodgerBlue,Poederblauw,#1e90ff
  DodgerBlue2,Poederblauw2,#1c86ee
  DodgerBlue3,Poederblauw3,#1874cd
  DodgerBlue4,Poederblauw4,#104e8b
  MediumBlue,Middenblauw,#0000cd
  Blue,Blauw,#0000ff
  Blue2,Blauw1,#0000ee
  Blue3,Blauw2,#0000cd
  Blue4/Darkblue,Blauw3/Donkerblauw,#00008b
  NavyBlue,Marineblauw,#000080
  MidnightBlue,Nachtblauw,#191970
  RoyalBlue1,Koningsblauw1,#4876ff
  RoyalBlue2,Koningsblauw2,#436eee
  RoyalBlue3,Koningsblauw3,#3a5fcd
  RoyalBlue4,Koningsblauw4,#27408b
  RoyalBlue,Koningsblauw,#4169e1
  CornflowerBlue,Korenbloemblauw,#6495ed
  LightSteelBlue,Lichtstaalblauw,#b0c4de
  LightSteelBlue1,Lichtstaalblauw1,#cae1ff
  LightSteelBlue2,Lichtstaalblauw2,#bcd2ee
  LightSteelBlue3,Lichtstaalblauw3,#a2b5cd
  LightSteelBlue4,Lichtstaalblauw4,#6e7b8b
  LightSlateGray,Lichtleigrijs,#778899
  SlateGray1,Leigrijs1,#c6e2ff
  SlateGray2,Leigrijs2,#b9d3ee
  SlateGray3,Leigrijs3,#9fb6cd
  SlateGray4,Leigrijs4,#6c7b8b
  SlateGrey,Leigrijs,#708090
  DarkSlateGray,Donkerleigrijs,#2f4f4f
  LightSlateBlue,Lichtleiblauw,#8470ff
  MediumSlateBlue,Middenleiblauw,#7b68ee
  SlateBlue,Leiblauw,#6a5acd
  SlateBlue1,Leiblauw1,#836fff
  SlateBlue2,Leiblauw2,#7a67ee
  SlateBlue3,Leiblauw3,#6959cd
  SlateBlue4,Leiblauw4,#473c8b
  DarkSlateBlue,Donkerleiblauw,#483d8b
  BlueViolet,Blauwpaars,#8a2be2
  Purple,Paars,#a020f0
  Purple1,Paars1,#9b30ff
  Purple2,Paars2,#912cee
  Purple3,Paars3,#7d26cd
  Purple4,Paars4,#551a8b
  MediumPurple,Middenpaars,#9370db
  MediumPurple1,Middenpaars1,#ab82ff
  MediumPurple2,Middenpaars2,#9f79ee
  MediumPurple3,Middenpaars3,#8968cd
  MediumPurple4,Middenpaars4,#5d478b
  Lavender,Lavendel,#e6e6fa
  LavenderBlush,Lavendelblos,#fff0f5
  LavenderBlush2,Lavendelblos2,#eee0e5
  LavenderBlush3,Lavendelblos3,#cdc1c5
  LavenderBlush4,Lavendelblos4,#8b8386
  DarkViolet,Donkerviolet,#9400d3
  DarkOrchid,Donkerorgidee,#9932cc
  DarkOrchid1,Donkerorgidee1,#bf3eff
  DarkOrchid2,Donkerorgidee2,#b23aee
  DarkOrchid3,Donkerorgidee3,#9a32cd
  DarkOrchid4,Donkerorgidee4,#68228b
  MediumOrchid,Midenorgidee,#ba55d3
  MediumOrchid1,Midenorgidee1,#e066ff
  MediumOrchid2,Midenorgidee2,#d15fee
  MediumOrchid3,Midenorgidee3,#b452cd
  MediumOrchid4,Midenorgidee4,#7a378b
  Orchid,Orchidee,#da70d6
  Orchid1,Orchidee1,#ff83fa
  Orchid2,Orchidee2,#ee7ae9
  Orchid3,Orchidee3,#cd69c9
  Orchid4,Orchidee4,#8b4789
  Plum,Pruim,#dda0dd
  Plum1,Pruim1,#ffbbff
  Plum2,Pruim2,#eeaeee
  Plum3,Pruim3,#cd96cd
  Plum4,Pruim4,#8b668b
  Thistle,Distel,#d8bfd8
  Thistle1,Distel1,#ffe1ff
  Thistle2,Distel2,#eed2ee
  Thistle3,Distel3,#cdb5cd
  Thistle4,Distel4,#8b7b8b
  Violet,Violet,#ee82ee
  Magenta,Magenta,#ff00ff
  Magenta2,Magenta2,#ee00ee
  Magenta3,Magenta3,#cd00cd
  Magenta4,Magenta4,#8b008b
  DarkMagenta,Donkermagenta,#8b008b
  MediumVioletRed,Middenroodviolet,#c71585
  Maroon,Kastanjebruin,#b03060
  Maroon1,Kastanjebruin1,#ff34b3
  Maroon2,Kastanjebruin2,#ee30a7
  Maroon3,Kastanjebruin3,#cd2990
  Maroon4,Kastanjebruin4,#8b1c62
  VioletRed,Roodviolet,#d02090
  VioletRed1,Roodviolet1,#ff3e96
  VioletRed2,Roodviolet2,#ee3a8c
  VioletRed3,Roodviolet3,#cd3278
  VioletRed4,Roodviolet4,#8b2252
  DeepPink,Dieproze,#ff1493
  DeepPink2,Dieproze2,#ee1289
  DeepPink3,Dieproze3,#cd1076
  DeepPink4,Dieproze4,#8b0a50
  HotPink,Warmroze,#ff69b4
  HotPink1,Warmroze1,#ff6eb4
  HotPink2,Warmroze2,#ee6aa7
  HotPink3,Warmroze3,#cd6090
  HotPink4,Warmroze4,#8b3a62
  PaleVioletRed,Faalroodpaars,#db7093
  PaleVioletRed1,Faalroodpaars1,#ff82ab
  PaleVioletRed2,Faalroodpaars2,#ee799f
  PaleVioletRed3,Faalroodpaars3,#cd6889
  PaleVioletRed4,Faalroodpaars4,#8b475d
  LightPink,Lichtroze,#ffb6c1
  LightPink1,Lichtroze1,#ffaeb9
  LightPink2,Lichtroze2,#eea2ad
  LightPink3,Lichtroze3,#cd8c95
  LightPink4,Lichtroze4,#8b5f65
  Pink,Roze,#ffc0cb
  Pink1,Roze1,#ffb5c5
  Pink2,Roze2,#eea9b8
  Pink3,Roze3,#cd919e
  Pink4,Roze4,#8b636c
  RosyBrown,Oudroze,#bc8f8f
  RosyBrown1,Oudroze1,#ffc1c1
  RosyBrown2,Oudroze2,#eeb4b4
  RosyBrown3,Oudroze3,#cd9b9b
  RosyBrown4,Oudroze4,#8b6969
  MistyRose,Zachtroze,#ffe4e1
  MistyRose2,Zachtroze2,#eed5d2
  MistyRose3,Zachtroze3,#cdb7b5
  MistyRose4,Zachtroze4,#8b7d7b
  Wheat,Tarwe,#f5deb3
  Wheat1,Tarwe1,#ffe7ba
  Wheat2,Tarwe2,#eed8ae
  Wheat3,Tarwe3,#cdba96
  Wheat4,Tarwe4,#8b7e66
  Moccasin,Moccasin,#ffe4b5
  NavajoWhite,Navajowit,#ffdead
  NavajoWhite2,Navajowit2,#eecfa1
  NavajoWhite3,Navajowit3,#cdb38b
  NavajoWhite4,Navajowit4,#8b795e
  BlanchedAlmond,Gebleekteamandel,#ffebcd
  PapayaWhip,,#ffefd5
  Bisque,Bisquei,#ffe4c4
  Bisque2,Bisquei2,#eed5b7
  Bisque3,Bisquei3,#cdb79e
  Bisque4,Bisquei4,#8b7d6b
  Burlywood,Hardhout,#deb887
  Burlywood1,Hardhout1,#ffd39b
  Burlywood2,Hardhout2,#eec591
  Burlywood3,Hardhout3,#cdaa7d
  Burlywood4,Hardhout4,#8b7355
  Tan,Zand,#d2b48c
  PeachPuff,,#ffdab9
  PeachPuff2,,#eecbad
  PeachPuff3,,#cdaf95
  PeachPuff4,,#8b7765
  Tan1,Geelbruin1,#ffa54f
  Tan2,Geelbruin2,#ee9a49
  Tan3,Geelbruin3,#cd852f
  Tan4,Geelbruin4,#8b5a2b
  Peru,Terracotta,#cd852f
  SaddleBrown,Zadelbruin,#8b4513
  SandyBrown,Zandbruin,#f4a460
  Chocolate,Chocolade,#d2691e
  Chocolate1,Chocolade1,#ff7f24
  Chocolate2,Chocolade2,#ee7621
  Chocolate3,Chocolade3,#cd661d
  Chocolate4,Chocolade4,#8b4513
  Sienna,Sienna,#a0522d
  Sienna1,Sienna1,#ff8247
  Sienna2,Sienna2,#ee7942
  Sienna3,Sienna3,#cd6839
  Sienna4,Sienna4,#8b4726
  Brown,Bruin,#a52a2a
  Brown1,Bruin1,#ff4040
  Brown2,Bruin2,#ee3b3b
  Brown3,Bruin3,#cd3333
  Brown4,Bruin4,#8b2323
  White,Wit,#ffffff
  WhiteSmoke,Rookwit,#f5f5f5
  Grey91,Grijs91,#e8e8e8
  Gainsboro,zachtgrijs,#dcdcdc
  LightGray,Lichtgrijs,#d3d3d3
  Grey81,Grijs81,#cfcfcf
  Grey,Grijs,#bebebe
  Grey71,Grijs71,#b5b5b5
  DarkGrey,Donkergrijs,#a9a9a9
  Grey61,Grijs61,#9c9c9c
  Grey51,Grijs51,#828282
  Grey41/DimGrey,Grijs41/Matgrijs,#696969
  Grey31,Grijs31,#4f4f4f
  Grey21,Grijs21,#363636
  Grey11,Grijs11,#1c1c1c
  Black,Zwart,#000000
  GhostWhite,Geestwit,#f8f8ff
  FloralWhite,Bloemenwit,#fffaf0
  OldLace,Kant,#fdf5e6
  Linen,Linnen,#faf0e6
  AntiqueWhite,Antiekwit,#faebd7
  AntiqueWhite1,Antiekwit1,#ffefdb
  AntiqueWhite2,Antiekwit2,#eedfcc
  AntiqueWhite3,Antiekwit3,#cdc0b0
  AntiqueWhite4,Antiekwit4,#8b8378
  Seashell,Schelp,#fff5ee
  Seashell2,Schelp2,#eee5de
  Seashell3,Schelp3,#cdc5bf
  Seashell4,Schelp4,#8b8682
  Snow,Sneeuw,#fffafa
  Snow2,Sneeuw2,#eee9e9
  Snow3,Sneeuw3,#cdc9c9
  Snow4,Sneeuw4,#8b8989
    `;
}
