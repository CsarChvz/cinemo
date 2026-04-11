package com.cinemo.api.domain.ports.in.seat_status;

import java.util.List;

import com.cinemo.api.domain.SeatStatus;

public interface SeatStatusUseCase {
    List<SeatStatus> getStatusByFunction(Long functionId);
    SeatStatus selectSeat(Long functionId, Long seatId, Long userId);
    Long undoLastSelection(Long functionId, Long userId);
    void joinWaitlist(Long functionId, Long seatId, Long userId);

    Long getWaitlistPosition(Long functionId, Long seatId, Long userId);
    void releaseSeat(Long functionId, Long seatId);

    void notifyNext(Long functionId, Long seatId);

    void releaseUserSession(Long functionId, Long userId);

    void deselectSeat(Long functionId, Long seatId, Long userId);

    void confirmSeatPurchase(Long functionId, Long seatId, Long userId);

    void revertToReservedTemp(Long functionId, Long seatId, Long userId);
}
