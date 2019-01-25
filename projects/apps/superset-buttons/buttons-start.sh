set -x

curl -u $FUSION_API_CREDENTIALS -H "Content-Type:multipart/form-data" -X POST -F 'importData=@Fusion_Starter_for_4_1_0.zip' $FUSION_API_BASE/objects/import?importPolicy=overwrite
