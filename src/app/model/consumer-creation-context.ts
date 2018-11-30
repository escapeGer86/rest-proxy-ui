import { ContentTypes } from './contentType/content-types';

export class ConsumerCreationContext {

    public accept: ContentTypes;
    public consumerGroup: string;
    public contentType: ContentTypes;
    public name: string;
    public format: string;
    public autoOffsetReset: string;
    public autoCommitEnable: boolean;
    public plannedSubscriptions: string[] = [];
    public instance_id: string;
    public base_uri: string;

    constructor() {
        this.accept = new ContentTypes();
        this.contentType = new ContentTypes();
        this.format = 'json';
        this.autoOffsetReset = 'earliest';
        this.autoCommitEnable = true;
      }

}
