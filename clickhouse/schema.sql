CREATE TABLE IF NOT EXISTS stats_queue (
    serviceName String,
    url String,
    elapsed Float64,
    loggedAt String
) ENGINE = Kafka SETTINGS
            kafka_broker_list = 'kafka:9093',
            kafka_topic_list = 'stats-topic',
            kafka_group_name = 'clickhouse-stats-group',
            kafka_format = 'JSONEachRow';

CREATE TABLE IF NOT EXISTS stats (
    serviceName String,
    url String,
    elapsed Float64,
    loggedAt DateTime
) ENGINE = MergeTree
ORDER BY (serviceName, loggedAt);

CREATE MATERIALIZED VIEW IF NOT EXISTS stats_queue_mv TO stats AS
SELECT serviceName, url, elapsed, parseDateTimeBestEffortOrNull(loggedAt) as loggedAt
FROM stats_queue;
