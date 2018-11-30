import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ConsumerCreationContext } from '../model/consumer-creation-context';

@Injectable({
  providedIn: 'root'
})
export class KafkaRestStubService {
  constructor(private _http: HttpClient) { }

  // url = 'http://192.168.99.100:8082';

/** Section API v2 : TOPICS */

  /**
   * Get a list of Kafka topics.
   * @param url the url of the rest proxy
   */
  getAllTopics(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Access-Control-Allow-Origin' : '*',
        'Host' : url,
        'Accept': 'application/vnd.kafka.v2+json',
      })
    };
    return this._http.get(url + '/topics', httpOptions);
  }

  /**
   * Get metadata about a specific topic.
   * @param url the url of the rest proxy
   * @param topic a specific topic.
   */
  getTopic(url: string, topic: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.kafka.v2+json',
      })
    };
    return this._http.get(url + '/topics' + '/' + topic, httpOptions);
  }

  /**
   * Subscribe to the given list of topics or a topic pattern to get dynamically assigned partitions.
   *  If a prior subscription exists, it would be replaced by the latest subscription.
   * @param url the url of the rest proxy
   * @param topic the topic to subscribe to.
   * @param consumerGroup the consumer group
   * @param consumerName the consumer name.
   */
  subscribeToTopic(url: string, topic: string[], consumerGroup: string, consumerName: string) {
    // $ curl -X POST -H "Content-Type: application/vnd.kafka.v2+json" --data '{"topics":["jsontest"]}'
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/vnd.kafka.v2+json'
      })
    };
    const postData = { 'topics': topic };
    this._http.post(url + '/consumers/' + consumerGroup + '/instances/' + consumerName
      + '/subscription', postData, httpOptions).subscribe(res => {
        // console.log(res);
      }
      );
  }

  /**
   * Produce messages to a topic, optionally specifying keys or partitions for the messages.
   * If no partition is provided, one will be chosen based on the hash of the key.
   * If no key is provided, the partition will be chosen for each message in a round-robin fashion.
   * @param url the url of the rest proxy
   * @param topic the topic to subscribe to.
   * @param contentType the content type
   * @param accept the accept Type
   * @param body the post body
   */
  postContentToTopic(url: string, topic: string, contentType: string, accept: string, body: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Content-Type': contentType,
        'Accept' : accept + ', application/vnd.kafka+json, application/json'
      })
    };
    const postData = { body };
    return this._http.post(url + '/topics' + '/' + topic, body, httpOptions);
  }

/** Section API v2 : PARTITIONS */

  /**
   * Get a list of partitions for the topic.
   * @param url the url of the rest proxy
   * @param topic the topic
   * @param accept the accept Type
   */
  getPartitions(url: string, topic: string, accept: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Accept' : accept
      })
    };
    return this._http.get(url + '/topics' + '/' + topic + '/partitions', httpOptions);
  }

  /**
   * Get metadata about a single partition in the topic.
   * @param url the url of the rest proxy
   * @param topic the topic
   * @param id  the id of the partition
   * @param accept the accept Type
   */
  getPartitionById(url: string, topic: string, id: String, accept: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Accept' : accept
      })
    };
    return this._http.get(url + '/topics' + '/' + topic + '/partitions' + '/' + id, httpOptions );
  }

  /**
   * Produce messages to one partition of the topic.
   * @param url the url of the rest proxy
   * @param topic the topic to subscribe to.
   * @param contentType the content type
   * @param accept  the accept Type
   * @param body the post body
   * @param id the id of the partition.
   */
  postContentToPartitionId(url: string, topic: string, contentType: string, accept: string, body: string, id: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Content-Type': contentType,
        'Accept' : accept
      })
    };
    const postData = { body };
    return this._http.post(url + '/topics' + '/' + topic + '/partitions/' + id, postData, httpOptions);
  }

/** Section API v2 : BROKERS */

  getBrokers(url: string) {
    return this._http.get(url + '/brokers');
  }

/** Section API v2 : CONSUMERS */

  /**
   * Create a new consumer instance in the consumer groupv
   * @param url the Url of the rest proxy
   * @param consumerContext the context with all needed information for the request.
   */
  createConsumerInConsumerGroup(url: string, consumerContext: ConsumerCreationContext) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': consumerContext.contentType.getContentType(),
      })
    };
    const postData = {
      'name': consumerContext.name,
      'format': consumerContext.format,
      'auto.offset.reset': consumerContext.autoOffsetReset,
      'auto.commit.enable': consumerContext.autoCommitEnable,
    };
 //   console.log('createConsumerInConsumerGroup: ' +  url + '/consumers/' + consumerContext.consumerGroup);
 //   console.log(postData);
 //   console.log(httpOptions);
    return this._http.post(url + '/consumers/' + consumerContext.consumerGroup, postData, httpOptions);
  }

  /**
   * Destroy the consumer instance.
   * @param url  the Url  of the rest proxy
   * @param consumerContext the context with all needed information for the request.
   */
  deleteConsumerInComsumerGroup(url: string, consumerContext: ConsumerCreationContext) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Content-Type': consumerContext.contentType.getAcceptType(),
      })
    };
    return this._http.delete(url + '/consumers/' + consumerContext.consumerGroup + '/instances/' + consumerContext.name, httpOptions);
  }

  /**
   * Commit a list of offsets for the consumer. When the post body is empty, it commits all the records
   * that have been fetched by the consumer instance.
   * Note that this request must be made to the specific REST proxy instance holding the consumer instance
   * @param url the Url  of the rest proxy
   * @param consumerContext the context with all needed information for the request.
   * @param body the request body
   */
  commitOffsetForConsumer(url: string, consumerContext: ConsumerCreationContext, body: string) {
    // POST /consumers/(string: group_name)/instances/(string: instance)/offsets
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Content-Type': consumerContext.contentType.getAcceptType(),
      })
    };
    // const postData = { body };
    return this._http.post(url + '/consumers/' + consumerContext.consumerGroup + '/instances/'
    + consumerContext.name + '/offsets', body, httpOptions);
  }

  /**
   * Get the last committed offsets for the given partitions (whether the commit happened by this process or another).
   * Note that this request must be made to the specific REST proxy instance holding the consumer instance.
   * @param url  the Url  of the rest proxy.
   * @param consumerContext the context with all needed information for the request.
   * @param body the request body
   */
  getLastCommitedOffsetForConsumer(url: string, consumerContext: ConsumerCreationContext, body: string) {
    // GET /consumers/(string: group_name)/instances/(string: instance)/offsets
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Accept': consumerContext.contentType.getAcceptType(),
      })
    };
    const postData = { body }; // Get with body?
    return this._http.get(url + '/consumers/' + consumerContext.consumerGroup + '/instances/'
    + consumerContext.name + '/offsets', httpOptions);
  }

  /**
   * Get the current subscribed list of topics.
   * @param url  the Url  of the rest proxy.
   * @param consumerContext the context with all needed information for the request.
   */
  getTopicSubscriptionsForConsumer(url: string, consumerContext: ConsumerCreationContext) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Content-Type': consumerContext.contentType.getAcceptType(),
      })
    };
    // GET /consumers/(string: group_name)/instances/(string: instance)/subscription
    return this._http.get(url + '/consumers/' + consumerContext.consumerGroup + '/instances/'
    + consumerContext.name + '/subscription', httpOptions);
  }

  /**
   * Unsubscribe from topics currently subscribed.
   * Note that this request must be made to the specific REST proxy instance holding the consumer instance.
   * @param url  the Url  of the rest proxy.
   * @param consumerContext the context with all needed information for the request.
   */
  unsubscribeTopicForConsumer(url: string, consumerContext: ConsumerCreationContext) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Content-Type': consumerContext.contentType.getAcceptType(),
      })
    };
    // DELETE /consumers/(string: group_name)/instances/(string: instance)/subscription
    return this._http.delete(url + '/consumers/' + consumerContext.consumerGroup + '/instances/' +
    consumerContext.name + '/subscription', httpOptions);
  }

  /**
   * Manually assign a list of partitions to this consumer.
   * @param url  the Url  of the rest proxy.
   * @param consumerContext the context with all needed information for the request.
   * @param body the request body.
   */
  assignPartitionsToConsumerManually(url: string, consumerContext: ConsumerCreationContext, body: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Content-Type': consumerContext.contentType.getAcceptType(),
      })
    };
    const postData = { body };
    // POST /consumers/(string: group_name)/instances/(string: instance)/assignments
    return this._http.post(url + '/consumers/' + consumerContext.consumerGroup + '/instances/'
    + consumerContext.name + '/assignments', postData, httpOptions);
  }

  /**
   * Get the list of partitions currently manually assigned to this consumer.
   * @param url  the Url  of the rest proxy.
   * @param consumerContext the context with all needed information for the request.
   */
  getManuallyAssignedPartitions(url: string, consumerContext: ConsumerCreationContext) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Content-Type': consumerContext.contentType.getAcceptType(),
      })
    };
    // GET /consumers/(string: group_name)/instances/(string: instance)/assignments
    return this._http.get(url + '/consumers/' + consumerContext.consumerGroup + '/instances/'
    + consumerContext.name + '/assignments', httpOptions);
  }

  /**
   * Overrides the fetch offsets that the consumer will use for the next set of records to fetch.
   * @param url  the Url  of the rest proxy.
   * @param consumerContext the context with all needed information for the request.
   * @param body the request body.
   */
  overrideOffsetForConsumer(url: string, consumerContext: ConsumerCreationContext, body: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Content-Type': consumerContext.contentType.getAcceptType(),
      })
    };
    const postData = { body };
    // POST /consumers/(string: group_name)/instances/(string: instance)/positions
    return this._http.post(url + '/consumers/' + consumerContext.consumerGroup + '/instances/'
    + consumerContext.name + '/positions', body, httpOptions);
  }

  /**
   * Seek to the first offset for each of the given partitions.
   * @param url  the Url  of the rest proxy.
   * @param consumerContext the context with all needed information for the request.
   * @param body the request body.
   */
  resetOffsetToBeginforConsumer(url: string, consumerContext: ConsumerCreationContext, body: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Content-Type': consumerContext.contentType.getAcceptType(),
      })
    };
    const postData = { body };
    // POST /consumers/(string: group_name)/instances/(string: instance)/positions/beginning
    return this._http.post(url + '/consumers/' + consumerContext.consumerGroup + '/instances/'
    + consumerContext.name + '/positions/beginning', body, httpOptions);
  }

  /**
   * Seek to the last offset for each of the given partitions.
   * @param url  the Url  of the rest proxy.
   * @param consumerContext the context with all needed information for the request.
   * @param body the request body.
   */
  resetOffsetToEndforConsumer(url: string, consumerContext: ConsumerCreationContext, body: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Content-Type': consumerContext.contentType.getAcceptType(),
      })
    };
    const postData = { body };
    // POST /consumers/(string: group_name)/instances/(string: instance)/positions/beginning
    return this._http.post(url + '/consumers/' + consumerContext.consumerGroup + '/instances/'
    + consumerContext.name + '/positions/end', body, httpOptions);
  }

  /**
   * Fetch data for the topics or partitions specified using one of the subscribe/assign APIs.
   * @param url  the Url  of the rest proxy.
   * @param consumerContext the context with all needed information for the request.
   */
  consumeData(url: string, consumerContext: ConsumerCreationContext) {
    // $ curl -X GET -H "Accept: application/vnd.kafka.json.v2+json"
    const httpOptions = {
      headers: new HttpHeaders({
        'Host' : url,
        'Accept': consumerContext.contentType.getContentType()
      })
    };
    return this._http.get(url + '/consumers/' + consumerContext.consumerGroup
    + '/instances/' + consumerContext.name + '/records?timeout=3000&max_bytes=300000', httpOptions);
  }

}
