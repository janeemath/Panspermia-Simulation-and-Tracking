;; Space Data Integration Contract

(define-map space-data
  { mission-id: (string-ascii 50) }
  {
    data: (string-utf8 1000),
    timestamp: uint,
    submitter: principal
  }
)

(define-public (submit-space-data (mission-id (string-ascii 50)) (data (string-utf8 1000)))
  (ok (map-set space-data
    { mission-id: mission-id }
    {
      data: data,
      timestamp: block-height,
      submitter: tx-sender
    }
  ))
)

(define-read-only (get-space-data (mission-id (string-ascii 50)))
  (ok (map-get? space-data { mission-id: mission-id }))
)

