csv2json -d -t $GITHUB_WORKSPACE/inst/curated/AsnicarF_2021_metadata.tsv test.json
sed -i '1s/^/{"samples":/' test.json
echo '}' >> test.json
linkml-validate -s schema.yaml test.json > results.txt
cat results.txt