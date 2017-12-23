/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerSizeAmsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/banner-size-ams/banner-size-ams-delete-dialog.component';
import { BannerSizeAmsService } from '../../../../../../main/webapp/app/entities/banner-size-ams/banner-size-ams.service';

describe('Component Tests', () => {

    describe('BannerSizeAms Management Delete Component', () => {
        let comp: BannerSizeAmsDeleteDialogComponent;
        let fixture: ComponentFixture<BannerSizeAmsDeleteDialogComponent>;
        let service: BannerSizeAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerSizeAmsDeleteDialogComponent],
                providers: [
                    BannerSizeAmsService
                ]
            })
            .overrideTemplate(BannerSizeAmsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerSizeAmsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerSizeAmsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
