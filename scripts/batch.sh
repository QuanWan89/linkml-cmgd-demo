gen-json-schema $GITHUB_WORKSPACE/schema.yaml > schema.json
rm results.txt
touch results.txt

FILES="$GITHUB_WORKSPACE/inst/curated/*/*.tsv"
for f in $FILES
do
    csv2json -d -t $f converted.json
    node $GITHUB_WORKSPACE/scripts/postConversion.js
    sed -i '1s/^/{"samples":/' final.json
    echo '}' >> final.json
    echo "Checking result for file $f..." >> results.txt
    jsonschema -i final.json schema.json -F "ERROR: {error.path} {error.message}" >>results.txt 2>&1
done
