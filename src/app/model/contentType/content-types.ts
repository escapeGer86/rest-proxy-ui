import { EmbeddedFormatEnum } from './embedded-format-enum';
import { ApiVersionEnum } from './api-version-enum';
import { SerializationFormatEnum } from './serialization-format-enum';
export class ContentTypes {

    public embeddedFormat: string;
    public apiVersion: string;
    public seraializationFormat: string;

    constructor() {
     this.embeddedFormat = 'json';
     this.apiVersion = 'v2';
     this.seraializationFormat = 'json';
    }

    // ContentType: application/vnd.kafka[.embedded_format].[api_version]+[serialization_format]
    public getContentType(): string {
        return 'application/vnd.kafka.' + this.embeddedFormat + '.' + this.apiVersion + '+' + this.seraializationFormat;
    }

    // Accept: application/vnd.kafka.[api_version]+[serialization_format]
    public getAcceptType(): string {
        return 'application/vnd.kafka.' + this.apiVersion + '+' + this.seraializationFormat;
    }
}
