;; Simulation Parameters Contract

(define-data-var last-simulation-id uint u0)

(define-map simulations
  { simulation-id: uint }
  {
    creator: principal,
    name: (string-ascii 100),
    description: (string-utf8 1000),
    parameters: (list 10 (string-ascii 50)),
    status: (string-ascii 20)
  }
)

(define-public (create-simulation (name (string-ascii 100)) (description (string-utf8 1000)) (parameters (list 10 (string-ascii 50))))
  (let
    (
      (new-id (+ (var-get last-simulation-id) u1))
    )
    (map-set simulations
      { simulation-id: new-id }
      {
        creator: tx-sender,
        name: name,
        description: description,
        parameters: parameters,
        status: "created"
      }
    )
    (var-set last-simulation-id new-id)
    (ok new-id)
  )
)

(define-public (update-simulation-status (simulation-id uint) (new-status (string-ascii 20)))
  (let
    (
      (simulation (unwrap! (map-get? simulations { simulation-id: simulation-id }) (err u404)))
    )
    (asserts! (is-eq (get creator simulation) tx-sender) (err u403))
    (ok (map-set simulations
      { simulation-id: simulation-id }
      (merge simulation { status: new-status })
    ))
  )
)

(define-read-only (get-simulation (simulation-id uint))
  (ok (map-get? simulations { simulation-id: simulation-id }))
)

