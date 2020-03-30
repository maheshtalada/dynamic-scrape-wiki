#!/bin/bash

pushd `dirname $0` > /dev/null;
ROOT_DIR=`pwd`'/..';
popd > /dev/null;

node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/in/in_en.po" -f jed1.x -p "${ROOT_DIR}/public/static/lang/in/in_en.json";
node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/in/in_ta.po" -f jed1.x -p "${ROOT_DIR}/public/static/lang/in/in_ta.json";
node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/in/in_hi.po" -f jed1.x -p "${ROOT_DIR}/public/static/lang/in/in_hi.json";
node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/in/in_te.po" -f jed1.x -p "${ROOT_DIR}/public/static/lang/in/in_te.json";
node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/in/in_kn.po" -f jed1.x -p "${ROOT_DIR}/public/static/lang/in/in_kn.json";
node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/in/in_ml.po" -f jed1.x -p "${ROOT_DIR}/public/static/lang/in/in_ml.json";
node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/us/us_en.po" -f jed1.x -p "${ROOT_DIR}/public/static/lang/us/us_en.json";
node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/us/us_es.po" -f jed1.x -p "${ROOT_DIR}/public/static/lang/us/us_es.json";
node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/us/us_fr.po" -f jed1.x -p "${ROOT_DIR}/public/static/lang/us/us_fr.json";
node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/us/us_pt.po" -f jed1.x -p "${ROOT_DIR}/public/static/lang/us/us_pt.json";
node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/us/us_de.po" -f jed1.x -p "${ROOT_DIR}/public/static/lang/us/us_de.json";
