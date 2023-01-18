csv2json -d -t ../inst/curated/AsnicarF_2021_metadata.tsv test.json
sed -i '1s/^/{"samples":/' test.json
echo '}' >> test.json
head test.json
tail test.json
linkml-validate -s schema.yaml test.json > results.txt
cat results.txt