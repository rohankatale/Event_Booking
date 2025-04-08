package db

import (
	"context"
	"fmt"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

func Credentials() (*cloudinary.Cloudinary, context.Context) {

    cld, _ := cloudinary.New()
    cld.Config.URL.Secure = true
    ctx := context.Background()
    return cld, ctx
}



func UploadImage(cld *cloudinary.Cloudinary,ctx context.Context,imagePath string){

	uploadResult,err := cld.Upload.Upload(ctx,imagePath,uploader.UploadParams{
		PublicID: "denji",
		UniqueFilename: api.Bool(false),
		Overwrite: api.Bool(true),
	})
	if err!=nil{
		panic(err)
	}
	fmt.Println(uploadResult.SecureURL)
}
